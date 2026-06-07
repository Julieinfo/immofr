/* ============================================================
   data.js — ImmoFR — Projet DAI — UPPA L2 STEE
   Données d'exemple : tableau global des annonces immobilières
   ============================================================ */

const annonces = [
  {
    id: 1,
    titre: "Appartement 2 pièces à louer à Paris 15e",
    transaction: "Location",
    region: "Île-de-France",
    ville: "Paris",
    typeBien: "Appartement",
    prix: 950,
    unitePrix: "€ / mois",
    surface: 40,
    pieces: 2,
    adresse: "45 rue de la Convention, 75015 Paris",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop"
    ],
    description: "Appartement lumineux proche du métro et des commerces, idéal pour un couple ou un étudiant. Double vitrage, parquet au sol, cuisine équipée.",
    dateAjout: "2025-02-10"
  },
  {
    id: 2,
    titre: "Maison 4 pièces à vendre près de Toulouse",
    transaction: "Vente",
    region: "Occitanie",
    ville: "Toulouse",
    typeBien: "Maison",
    prix: 320000,
    unitePrix: "€",
    surface: 110,
    pieces: 4,
    adresse: "12 allée des Roses, 31400 Toulouse",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop"
    ],
    description: "Belle maison de ville avec jardin privatif, garage et terrasse. Proche écoles et transports. Idéale pour une famille.",
    dateAjout: "2025-01-15"
  },
  {
    id: 3,
    titre: "Studio meublé en location saisonnière à Nice",
    transaction: "Saisonnier",
    region: "Provence-Alpes-Côte d'Azur",
    ville: "Nice",
    typeBien: "Studio",
    prix: 80,
    unitePrix: "€ / nuit",
    surface: 22,
    pieces: 1,
    adresse: "3 promenade des Anglais, 06000 Nice",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"
    ],
    description: "Studio entièrement équipé à deux pas de la mer. Vue dégagée, climatisation, Wi-Fi inclus. Idéal pour les vacances.",
    dateAjout: "2025-03-01"
  },
  {
    id: 4,
    titre: "Appartement T3 à louer à Lyon",
    transaction: "Location",
    region: "Auvergne-Rhône-Alpes",
    ville: "Lyon",
    typeBien: "Appartement",
    prix: 850,
    unitePrix: "€ / mois",
    surface: 65,
    pieces: 3,
    adresse: "8 rue de la République, 69001 Lyon",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop"
    ],
    description: "Beau T3 lumineux en plein centre-ville, proche métro et commerces. Balcon, cave incluse.",
    dateAjout: "2025-01-28"
  },
  {
    id: 5,
    titre: "Maison de village en Nouvelle-Aquitaine",
    transaction: "Vente",
    region: "Nouvelle-Aquitaine",
    ville: "Bordeaux",
    typeBien: "Maison",
    prix: 275000,
    unitePrix: "€",
    surface: 95,
    pieces: 4,
    adresse: "7 rue du Château, 33000 Bordeaux",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&h=400&fit=crop"
    ],
    description: "Charmante maison en pierre au cœur des vignes bordelaises. Terrasse, cellier, vue sur vignoble.",
    dateAjout: "2024-12-05"
  },
  {
    id: 6,
    titre: "Local commercial à louer à Marseille",
    transaction: "Location",
    region: "Provence-Alpes-Côte d'Azur",
    ville: "Marseille",
    typeBien: "Local commercial",
    prix: 1500,
    unitePrix: "€ / mois",
    surface: 80,
    pieces: 3,
    adresse: "22 rue Paradis, 13006 Marseille",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop"
    ],
    description: "Local commercial en rez-de-chaussée, vitrine double, accès livraison, idéal boutique ou cabinet.",
    dateAjout: "2025-02-20"
  },
  {
    id: 7,
    titre: "Terrain constructible à vendre en Bretagne",
    transaction: "Vente",
    region: "Bretagne",
    ville: "Rennes",
    typeBien: "Terrain",
    prix: 85000,
    unitePrix: "€",
    surface: 500,
    pieces: 0,
    adresse: "Route de Saint-Malo, 35000 Rennes",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop"
    ],
    description: "Terrain plat viabilisé, tout à l'égout, permis de construire accordé. Environnement calme et verdoyant.",
    dateAjout: "2024-11-10"
  },
  {
    id: 8,
    titre: "Villa avec piscine en location saisonnière",
    transaction: "Saisonnier",
    region: "Provence-Alpes-Côte d'Azur",
    ville: "Aix-en-Provence",
    typeBien: "Maison",
    prix: 350,
    unitePrix: "€ / nuit",
    surface: 180,
    pieces: 6,
    adresse: "Chemin des Lavandes, 13100 Aix-en-Provence",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop"
    ],
    description: "Splendide villa provençale avec piscine à débordement, grande terrasse et jardin paysager. 6 personnes max.",
    dateAjout: "2025-03-12"
  },
  {
    id: 9,
    titre: "Studio étudiant à louer à Toulouse",
    transaction: "Location",
    region: "Occitanie",
    ville: "Toulouse",
    typeBien: "Studio",
    prix: 520,
    unitePrix: "€ / mois",
    surface: 18,
    pieces: 1,
    adresse: "14 rue des Jacobins, 31000 Toulouse",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=400&fit=crop"
    ],
    description: "Studio meublé idéal étudiant, proche fac de droit et tramway. Charges comprises, accès internet.",
    dateAjout: "2025-02-14"
  },
  {
    id: 10,
    titre: "Appartement haussmannien à vendre à Bordeaux",
    transaction: "Vente",
    region: "Nouvelle-Aquitaine",
    ville: "Bordeaux",
    typeBien: "Appartement",
    prix: 420000,
    unitePrix: "€",
    surface: 90,
    pieces: 4,
    adresse: "6 cours de l'Intendance, 33000 Bordeaux",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=600&h=400&fit=crop"
    ],
    description: "Magnifique appartement haussmannien avec moulures, parquet d'époque, hauts plafonds. Au cœur du triangle d'or bordelais.",
    dateAjout: "2025-01-03"
  },
  {
    id: 11,
    titre: "Chalet en location saisonnière à Chamonix",
    transaction: "Saisonnier",
    region: "Auvergne-Rhône-Alpes",
    ville: "Chamonix",
    typeBien: "Maison",
    prix: 400,
    unitePrix: "€ / nuit",
    surface: 120,
    pieces: 5,
    adresse: "Route du Mont-Blanc, 74400 Chamonix",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop"
    ],
    description: "Chalet authentique avec vue imprenable sur le Mont-Blanc. Sauna, cheminée, ski aux pieds. Jusqu'à 10 personnes.",
    dateAjout: "2025-03-05"
  },
  {
    id: 12,
    titre: "Loft industriel à louer à Lille",
    transaction: "Location",
    region: "Hauts-de-France",
    ville: "Lille",
    typeBien: "Appartement",
    prix: 1200,
    unitePrix: "€ / mois",
    surface: 85,
    pieces: 3,
    adresse: "Rue Faidherbe, 59000 Lille",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
    ],
    description: "Loft atypique dans une ancienne filature rénovée. Grandes baies vitrées, béton ciré, mezzanine. Ambiance unique.",
    dateAjout: "2024-12-20"
  }
];
