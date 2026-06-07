/* ============================================================
   app.js — ImmoFR — Projet DAI — UPPA L2 STEE
   Architecture SAM : State – Action – Model – View
   Navigation par vues (vue-accueil / vue-detail / vue-form / vue-contact)
   ============================================================ */

/* ============================================================
   STATE
   ============================================================ */
var state = {
  annonces: [],
  annoncesFiltrees: [],
  favorisIds: [],
  pageActuelle: 1,
  parPage: 6,
  filtres: {
    transaction: 'Tous',
    region: 'Toute la France',
    typeBien: 'Tous',
    prixMin: '',
    prixMax: '',
    favorisOnly: false
  },
  tri: 'defaut',
  annonceDetail: null,
  annonceEditId: null,
  carouselIndex: 0,
  nextId: 100
};

/* ============================================================
   MODEL
   ============================================================ */
var model = {

  /** Applique les filtres et le tri sur state.annonces */
  applyFiltersAndSort: function() {
    var f = state.filtres;
    var result = state.annonces.filter(function(a) {
      if (f.transaction !== 'Tous' && a.transaction !== f.transaction) return false;
      if (f.region !== 'Toute la France' && a.region !== f.region)    return false;
      if (f.typeBien !== 'Tous' && a.typeBien !== f.typeBien)          return false;
      if (f.prixMin !== '' && a.prix < parseFloat(f.prixMin))          return false;
      if (f.prixMax !== '' && a.prix > parseFloat(f.prixMax))          return false;
      if (f.favorisOnly && state.favorisIds.indexOf(a.id) === -1)      return false;
      return true;
    });
    switch (state.tri) {
      case 'prix-asc':    result.sort(function(a,b){return a.prix - b.prix;}); break;
      case 'prix-desc':   result.sort(function(a,b){return b.prix - a.prix;}); break;
      case 'recent':      result.sort(function(a,b){return new Date(b.dateAjout)-new Date(a.dateAjout);}); break;
      case 'ancien':      result.sort(function(a,b){return new Date(a.dateAjout)-new Date(b.dateAjout);}); break;
      case 'surface-asc': result.sort(function(a,b){return a.surface - b.surface;}); break;
    }
    state.annoncesFiltrees = result;
  },

  /** Valide le formulaire de contact */
  validateContactForm: function() {
    var ok = true;
    var checks = [
      {id:'c-nom',     msg:'Le nom est obligatoire.'},
      {id:'c-email',   msg:"L'email est obligatoire."},
      {id:'c-type',    msg:'Veuillez choisir un type de demande.'},
      {id:'c-message', msg:'Le message est obligatoire.'}
    ];
    checks.forEach(function(c) {
      var el  = document.getElementById(c.id);
      var err = document.getElementById(c.id + '-error');
      el.classList.remove('error');
      err.textContent = '';
      if (!el.value.trim()) {
        el.classList.add('error');
        err.textContent = c.msg;
        ok = false;
      }
    });
    var em    = document.getElementById('c-email');
    var emErr = document.getElementById('c-email-error');
    if (em.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) {
      em.classList.add('error');
      emErr.textContent = "Format d'email invalide.";
      ok = false;
    }
    return ok;
  },

  /** Valide le formulaire d'annonce */
  validateAnnonceForm: function() {
    var ok = true;
    var ids = ['a-titre','a-transaction','a-region','a-ville','a-typeBien','a-prix'];
    ids.forEach(function(id) {
      var el  = document.getElementById(id);
      var err = document.getElementById(id + '-error');
      el.classList.remove('error');
      if (err) err.textContent = '';
      if (!el.value.trim()) {
        el.classList.add('error');
        if (err) err.textContent = 'Champ obligatoire.';
        ok = false;
      }
    });
    return ok;
  }
};

/* ============================================================
   VIEW
   ============================================================ */
var view = {

  /**
   * Bascule entre les vues : 'accueil' | 'detail' | 'form' | 'contact'
   * Une seule vue visible à la fois.
   */
  showVue: function(name) {
    var vues = ['accueil','detail','form','contact'];
    vues.forEach(function(v) {
      var el = document.getElementById('vue-' + v);
      if (el) el.style.display = (v === name) ? 'block' : 'none';
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
  },

  /** Rendu initial complet */
  render: function() {
    this.renderResults();
    this.showVue('accueil');
  },

  /** Met à jour la grille, le compteur et la pagination */
  renderResults: function() {
    var total   = state.annoncesFiltrees.length;
    var nbPages = Math.max(1, Math.ceil(total / state.parPage));
    if (state.pageActuelle > nbPages) state.pageActuelle = nbPages;
    var debut = (state.pageActuelle - 1) * state.parPage;
    var page  = state.annoncesFiltrees.slice(debut, debut + state.parPage);

    /* Compteur */
    var metaEl = document.getElementById('results-meta');
    if (metaEl) {
      metaEl.innerHTML = '<strong>' + total + '</strong> annonce' +
        (total !== 1 ? 's' : '') + ' trouvée' + (total !== 1 ? 's' : '');
    }

    /* Grille */
    var grid = document.getElementById('annonces-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (page.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.style.gridColumn = '1 / -1';
      empty.innerHTML = '<div class="empty-icon">🏠</div>Aucun bien ne correspond à votre recherche.';
      grid.appendChild(empty);
    } else {
      page.forEach(function(a, i) {
        var card = view.buildCard(a);
        card.style.animationDelay = (i * 0.06) + 's';
        grid.appendChild(card);
      });
    }

    view.renderPagination(nbPages);
  },

  /** Construit et retourne un élément card DOM */
  buildCard: function(a) {
    var isFav = state.favorisIds.indexOf(a.id) !== -1;
    var badgeMap = {Location:'badge-location', Vente:'badge-vente', Saisonnier:'badge-saisonnier'};
    var badgeClass = badgeMap[a.transaction] || 'badge-location';

    var card = document.createElement('div');
    card.className = 'card-annonce';
    card.innerHTML =
      '<div class="card-img">' +
        '<img src="' + a.image + '" alt="" loading="lazy"' +
          ' onerror="this.src=\'https://placehold.co/600x400/1a1e2a/5b8fff?text=ImmoFR\'"/>' +
        '<span class="card-badge ' + badgeClass + '">' + a.transaction + '</span>' +
        '<button class="card-fav-btn' + (isFav ? ' active' : '') + '" title="Favori">' +
          (isFav ? '★' : '☆') +
        '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-title">' + a.titre + '</div>' +
        '<div class="card-meta">' + a.transaction + ' · ' + a.region + ' – ' + a.ville + '</div>' +
        '<div class="card-prix">' + a.prix.toLocaleString('fr-FR') + ' ' + a.unitePrix + '</div>' +
        '<div class="card-infos">' +
          (a.surface ? '<span>📐 ' + a.surface + ' m²</span>' : '') +
          (a.pieces  ? '<span>🚪 ' + a.pieces + ' pièce' + (a.pieces > 1 ? 's' : '') + '</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="card-actions">' +
        '<button class="btn btn-primary btn-sm">Détails</button>' +
        '<button class="btn btn-ghost btn-sm">Modifier</button>' +
        '<button class="btn btn-danger btn-sm">Supprimer</button>' +
      '</div>';

    /* Événements — capture id dans la closure */
    var id = a.id;
    var btns = card.querySelectorAll('.card-actions .btn');
    btns[0].addEventListener('click', function() { actions.openDetail(id); });
    btns[1].addEventListener('click', function() { actions.openFormEdit(id); });
    btns[2].addEventListener('click', function() { actions.deleteAnnonce(id); });
    card.querySelector('.card-fav-btn').addEventListener('click', function() {
      actions.toggleFavori(id);
    });

    return card;
  },

  /** Rendu de la barre de pagination */
  renderPagination: function(nbPages) {
    var pag = document.getElementById('pagination');
    if (!pag) return;
    pag.innerHTML = '';
    var cur = state.pageActuelle;

    function mkBtn(label, p, disabled, active) {
      var b = document.createElement('button');
      b.className = 'page-btn' + (active ? ' active' : '');
      b.textContent = label;
      b.disabled = disabled;
      if (!disabled && !active) {
        b.addEventListener('click', function() { actions.goPage(p); });
      }
      return b;
    }

    pag.appendChild(mkBtn('«', cur - 1, cur === 1, false));
    for (var i = 1; i <= nbPages; i++) {
      pag.appendChild(mkBtn(i, i, false, i === cur));
    }
    pag.appendChild(mkBtn('»', cur + 1, cur === nbPages, false));
  },

  /** Remplit la fiche détaillée avec les données de l'annonce */
  renderDetail: function() {
    var a = state.annonceDetail;
    if (!a) return;

    function set(id, val) {
      var el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    set('detail-titre',       a.titre);
    set('detail-prix',        a.prix.toLocaleString('fr-FR') + ' ' + a.unitePrix);
    set('detail-location',    a.region + ' – ' + a.ville);
    set('detail-typebien',    a.typeBien);
    set('detail-surface',     a.surface ? a.surface + ' m²' : '—');
    set('detail-pieces',      a.pieces  ? String(a.pieces)  : '—');
    set('detail-adresse',     a.adresse  || '—');
    set('detail-description', a.description || '—');

    var badge = document.getElementById('detail-transaction');
    if (badge) {
      var badgeMap = {Location:'badge-location', Vente:'badge-vente', Saisonnier:'badge-saisonnier'};
      badge.textContent = a.transaction;
      badge.className = 'card-badge ' + (badgeMap[a.transaction] || 'badge-location');
    }

    view.updateCarousel();
  },

  /** Met à jour l'image du carrousel et les dots */
  updateCarousel: function() {
    var a = state.annonceDetail;
    if (!a) return;
    var imgs = (a.images && a.images.length) ? a.images : [a.image];
    var idx  = state.carouselIndex;

    var imgEl = document.getElementById('carousel-img');
    if (imgEl) { imgEl.src = imgs[idx] || a.image; imgEl.alt = a.titre; }

    var dotsEl = document.getElementById('carousel-dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    imgs.forEach(function(_, i) {
      var d = document.createElement('div');
      d.className = 'carousel-dot' + (i === idx ? ' active' : '');
      (function(idx2) {
        d.addEventListener('click', function() { actions.carouselGoto(idx2); });
      })(i);
      dotsEl.appendChild(d);
    });
  },

  /** Remplit (ou vide) le formulaire d'annonce */
  renderForm: function(annonce) {
    var titleEl = document.getElementById('form-annonce-title');
    if (titleEl) titleEl.textContent = annonce ? 'Modifier une annonce' : 'Ajouter une annonce';

    var fields = ['titre','transaction','region','ville','typeBien','prix','surface','pieces','adresse','description'];
    fields.forEach(function(f) {
      var el = document.getElementById('a-' + f);
      if (el) el.value = (annonce && annonce[f] !== undefined) ? annonce[f] : '';
    });

    /* Effacer les erreurs */
    document.querySelectorAll('#vue-form .error').forEach(function(el) {
      el.classList.remove('error');
    });
    document.querySelectorAll('#vue-form .field-error').forEach(function(el) {
      el.textContent = '';
    });

    /* Reset fichiers */
    var fi1 = document.getElementById('a-image');  if (fi1) fi1.value = '';
    var fi2 = document.getElementById('a-images'); if (fi2) fi2.value = '';
  },

  /** Toast temporaire en bas de l'écran */
  showToast: function(msg, type) {
    type = type || 'info';
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className   = 'toast toast-' + type + ' show';
    clearTimeout(toast._tid);
    toast._tid = setTimeout(function() { toast.classList.remove('show'); }, 3200);
  }
};

/* ============================================================
   ACTIONS
   ============================================================ */
var actions = {

  /** Initialise l'appli */
  init: function() {
    state.annonces = annonces.map(function(a) {
      return Object.assign({}, a, { images: a.images ? a.images.slice() : [a.image] });
    });
    var ids = state.annonces.map(function(a) { return a.id; });
    state.nextId = Math.max.apply(null, ids) + 1;
    model.applyFiltersAndSort();
    view.render();
  },

  /** Soumission du formulaire de recherche */
  search: function(e) {
    e.preventDefault();
    state.filtres.transaction = document.getElementById('f-transaction').value;
    state.filtres.region      = document.getElementById('f-region').value;
    state.filtres.typeBien    = document.getElementById('f-typeBien').value;
    state.filtres.prixMin     = document.getElementById('f-prixMin').value;
    state.filtres.prixMax     = document.getElementById('f-prixMax').value;
    state.filtres.favorisOnly = document.getElementById('f-favoris').checked;
    state.pageActuelle = 1;
    model.applyFiltersAndSort();
    view.renderResults();
    document.getElementById('section-results').scrollIntoView({behavior:'smooth', block:'start'});
  },

  /** Changement du tri */
  sort: function(val) {
    state.tri = val;
    state.pageActuelle = 1;
    model.applyFiltersAndSort();
    view.renderResults();
  },

  /** Changement de page */
  goPage: function(p) {
    state.pageActuelle = p;
    view.renderResults();
    document.getElementById('section-results').scrollIntoView({behavior:'smooth', block:'start'});
  },

  /** Ouvrir la fiche détaillée */
  openDetail: function(id) {
    var found = null;
    for (var i = 0; i < state.annonces.length; i++) {
      if (state.annonces[i].id === id) { found = state.annonces[i]; break; }
    }
    if (!found) return;
    state.annonceDetail = found;
    state.carouselIndex = 0;
    view.renderDetail();
    view.showVue('detail');
  },

  /** Retour à l'accueil depuis le détail */
  backToResults: function() {
    view.showVue('accueil');
  },

  /** Basculer favori */
  toggleFavori: function(id) {
    var idx = state.favorisIds.indexOf(id);
    if (idx === -1) state.favorisIds.push(id);
    else            state.favorisIds.splice(idx, 1);
    model.applyFiltersAndSort();
    view.renderResults();
  },

  /** Ouvrir le formulaire d'ajout */
  openFormAdd: function() {
    state.annonceEditId = null;
    view.renderForm(null);
    view.showVue('form');
  },

  /** Ouvrir le formulaire de modification */
  openFormEdit: function(id) {
    var found = null;
    for (var i = 0; i < state.annonces.length; i++) {
      if (state.annonces[i].id === id) { found = state.annonces[i]; break; }
    }
    state.annonceEditId = id;
    view.renderForm(found);
    view.showVue('form');
  },

  /** Valider le formulaire d'annonce */
  submitAnnonce: function(e) {
    e.preventDefault();
    if (!model.validateAnnonceForm()) return;

    var titre       = document.getElementById('a-titre').value.trim();
    var transaction = document.getElementById('a-transaction').value;
    var region      = document.getElementById('a-region').value;
    var ville       = document.getElementById('a-ville').value.trim();
    var typeBien    = document.getElementById('a-typeBien').value;
    var prix        = parseFloat(document.getElementById('a-prix').value);
    var surface     = parseFloat(document.getElementById('a-surface').value) || 0;
    var pieces      = parseInt(document.getElementById('a-pieces').value, 10) || 0;
    var adresse     = document.getElementById('a-adresse').value.trim();
    var description = document.getElementById('a-description').value.trim();
    var uniteMap    = {Location:'€ / mois', Vente:'€', Saisonnier:'€ / nuit'};
    var unitePrix   = uniteMap[transaction] || '€';

    /* Image principale */
    var fi = document.getElementById('a-image');
    var imageUrl = 'https://placehold.co/600x400/1a1e2a/5b8fff?text=ImmoFR';
    if (state.annonceEditId !== null) {
      for (var i = 0; i < state.annonces.length; i++) {
        if (state.annonces[i].id === state.annonceEditId) { imageUrl = state.annonces[i].image; break; }
      }
    }
    if (fi && fi.files && fi.files[0]) imageUrl = URL.createObjectURL(fi.files[0]);

    /* Images multiples */
    var imagesArr = [imageUrl];
    if (state.annonceEditId !== null) {
      for (var j = 0; j < state.annonces.length; j++) {
        if (state.annonces[j].id === state.annonceEditId) { imagesArr = state.annonces[j].images.slice(); break; }
      }
    }
    var fm = document.getElementById('a-images');
    if (fm && fm.files && fm.files.length > 0) {
      imagesArr = Array.prototype.map.call(fm.files, function(f) { return URL.createObjectURL(f); });
    }
    if (imagesArr.length === 0) imagesArr = [imageUrl];

    if (state.annonceEditId !== null) {
      /* Modification */
      for (var k = 0; k < state.annonces.length; k++) {
        if (state.annonces[k].id === state.annonceEditId) {
          state.annonces[k] = Object.assign({}, state.annonces[k], {
            titre:titre, transaction:transaction, region:region, ville:ville,
            typeBien:typeBien, prix:prix, unitePrix:unitePrix,
            surface:surface, pieces:pieces, adresse:adresse, description:description,
            image:imageUrl, images:imagesArr
          });
          break;
        }
      }
      view.showToast('✓ Annonce mise à jour avec succès', 'success');
    } else {
      /* Ajout */
      var today = new Date().toISOString().slice(0, 10);
      state.annonces.push({
        id:state.nextId++, titre:titre, transaction:transaction, region:region,
        ville:ville, typeBien:typeBien, prix:prix, unitePrix:unitePrix,
        surface:surface, pieces:pieces, adresse:adresse, description:description,
        image:imageUrl, images:imagesArr, dateAjout:today
      });
      view.showToast('✓ Annonce ajoutée avec succès', 'success');
    }

    state.annonceEditId = null;
    document.getElementById('form-annonce').reset();
    model.applyFiltersAndSort();
    view.renderResults();
    view.showVue('accueil');
  },

  /** Annuler le formulaire */
  cancelForm: function() {
    state.annonceEditId = null;
    document.getElementById('form-annonce').reset();
    view.showVue('accueil');
  },

  /** Supprimer une annonce */
  deleteAnnonce: function(id) {
    if (!confirm('Supprimer cette annonce définitivement ?')) return;
    state.annonces   = state.annonces.filter(function(a) { return a.id !== id; });
    state.favorisIds = state.favorisIds.filter(function(fid) { return fid !== id; });
    model.applyFiltersAndSort();
    view.renderResults();
    view.showToast('✓ Annonce supprimée', 'info');
  },

  /** Carrousel : précédent */
  carouselPrev: function() {
    var imgs = (state.annonceDetail.images && state.annonceDetail.images.length)
      ? state.annonceDetail.images : [state.annonceDetail.image];
    state.carouselIndex = (state.carouselIndex - 1 + imgs.length) % imgs.length;
    view.updateCarousel();
  },

  /** Carrousel : suivant */
  carouselNext: function() {
    var imgs = (state.annonceDetail.images && state.annonceDetail.images.length)
      ? state.annonceDetail.images : [state.annonceDetail.image];
    state.carouselIndex = (state.carouselIndex + 1) % imgs.length;
    view.updateCarousel();
  },

  /** Carrousel : aller à l'index i */
  carouselGoto: function(i) {
    state.carouselIndex = i;
    view.updateCarousel();
  },

  /** Soumettre le formulaire de contact */
  submitContact: function(e) {
    e.preventDefault();
    if (!model.validateContactForm()) return;
    document.getElementById('form-contact').reset();
    view.showToast('✉ Message envoyé ! Nous vous répondrons dans les plus brefs délais.', 'success');
  }
};

/* ============================================================
   BRANCHEMENT DES ÉVÉNEMENTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

  /* Recherche */
  document.getElementById('form-recherche').addEventListener('submit', function(e) {
    actions.search(e);
  });

  /* Favori only en live */
  document.getElementById('f-favoris').addEventListener('change', function(e) {
    state.filtres.favorisOnly = e.target.checked;
    state.pageActuelle = 1;
    model.applyFiltersAndSort();
    view.renderResults();
  });

  /* Tri */
  document.getElementById('select-tri').addEventListener('change', function(e) {
    actions.sort(e.target.value);
  });

  /* Bouton + Ajouter dans la barre résultats */
  document.getElementById('btn-add-annonce').addEventListener('click', function() {
    actions.openFormAdd();
  });

  /* Navbar */
  document.getElementById('nav-accueil').addEventListener('click', function(e) {
    e.preventDefault();
    view.showVue('accueil');
  });
  document.getElementById('nav-add').addEventListener('click', function(e) {
    e.preventDefault();
    actions.openFormAdd();
  });
  document.getElementById('nav-contact').addEventListener('click', function(e) {
    e.preventDefault();
    view.showVue('contact');
  });

  /* Formulaire annonce */
  document.getElementById('form-annonce').addEventListener('submit', function(e) {
    actions.submitAnnonce(e);
  });
  document.getElementById('btn-cancel-form').addEventListener('click', function() {
    actions.cancelForm();
  });

  /* Retour depuis détail */
  document.getElementById('btn-back-detail').addEventListener('click', function() {
    actions.backToResults();
  });

  /* Retour depuis contact */
  document.getElementById('btn-back-contact').addEventListener('click', function() {
    view.showVue('accueil');
  });

  /* Carrousel */
  document.getElementById('carousel-prev').addEventListener('click', function() {
    actions.carouselPrev();
  });
  document.getElementById('carousel-next').addEventListener('click', function() {
    actions.carouselNext();
  });

  /* Contact */
  document.getElementById('form-contact').addEventListener('submit', function(e) {
    actions.submitContact(e);
  });

  /* Lancement */
  actions.init();
});
