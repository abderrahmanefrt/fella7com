export const categories = [
  { id: 'all', name: 'Toutes les catégories' },
  { id: 'vegetables', name: 'Légumes' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'grains', name: 'Céréales & Légumineuses' },
  { id: 'livestock', name: 'Bétail & Volaille' },
  { id: 'dairy', name: 'Produits Laitiers' },
  { id: 'equipment', name: 'Matériel Agricole' },
  { id: 'fertilizers', name: 'Engrais & Phyto' },
  { id: 'olives', name: 'Olives & Huile' },
  { id: 'honey', name: 'Miel & Apiculture' },
  { id: 'nursery', name: 'Pépinière & Plants' },
  { id: 'grapes', name: 'Viticulture' },
  { id: 'citrus', name: 'Agrumes' },
];

export const wilayas = [
  'All Wilayas', 'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
  'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
  'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
  'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
  "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj',
  'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
  'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal',
  'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Meniaa',
  'Aflou', 'Barika', 'El Kantara', 'Bir El Ater', 'El Aricha', 'Ksar Chellala',
  'Aïn Oussera', 'Messaad', 'Ksar El Boukhari', 'Bou Saâda', 'El Abiodh Sidi Cheikh'
];

// ─────────────────────────────────────────────────────────────────────────────
// Facebook-style default avatars — inline SVG data URLs, no external requests
// ─────────────────────────────────────────────────────────────────────────────
const AVATAR_MALE = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#bcc0c4"/>
  <circle cx="50" cy="37" r="17" fill="#ffffff"/>
  <ellipse cx="50" cy="92" rx="29" ry="21" fill="#ffffff"/>
</svg>
`)}`;

const AVATAR_FEMALE = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#bcc0c4"/>
  <circle cx="50" cy="37" r="17" fill="#ffffff"/>
  <ellipse cx="50" cy="95" rx="31" ry="23" fill="#ffffff"/>
  <path d="M33 58 Q40 52 50 51 Q60 52 67 58" fill="#ffffff"/>
</svg>
`)}`;

// ─────────────────────────────────────────────────────────────────────────────
// SELLERS
// ─────────────────────────────────────────────────────────────────────────────
export const sellers = [
  {
    id: 's1', name: 'Derriche Mohamed', type: 'Pépinièriste', wilaya: 'Blida',
    age: 44, experience: 15, landSize: 3,
    bio: "Pépinièriste passionné spécialisé dans la production de plants maraîchers et fruitiers certifiés. Fourniture de plants sains et robustes pour les agriculteurs de la région.",
    avatar: AVATAR_MALE, phone: '0555-10-20-30', rating: 4.8,
  },
  {
    id: 's2', name: 'Doumaz Fadil', type: 'Céréaliculture', wilaya: 'Tiaret',
    age: 50, experience: 22, landSize: 120,
    bio: "Céréaliculteur des hautes plaines de Tiaret. Spécialiste du blé dur, orge et triticale. Production à grande échelle avec des équipements modernes.",
    avatar: AVATAR_MALE, phone: '0770-20-30-40', rating: 4.6,
  },
  {
    id: 's3', name: 'Doumaz Malika', type: 'Apiculteur', wilaya: 'Béjaïa',
    age: 38, experience: 10, landSize: 0,
    bio: "Apicultrice passionnée en Kabylie. Production de miel naturel toutes fleurs, miel de thym et propolis. Ruches installées en montagne loin de toute pollution.",
    avatar: AVATAR_FEMALE, phone: '0661-30-40-50', rating: 4.9,
  },
  {
    id: 's4', name: 'Doumaz Mourad', type: 'Aviculteur', wilaya: 'Sétif',
    age: 35, experience: 8, landSize: 2,
    bio: "Aviculteur spécialisé en élevage de poulets de chair et de poules pondeuses. Élevage semi-intensif avec alimentation naturelle équilibrée.",
    avatar: AVATAR_MALE, phone: '0770-40-50-60', rating: 4.5,
  },
  {
    id: 's5', name: 'Draoui Sid Ahmed', type: 'Éleveur de bétail', wilaya: 'Djelfa',
    age: 55, experience: 28, landSize: 0,
    bio: "Éleveur de bétail traditionnel des steppes de Djelfa. Spécialiste des ovins et caprins de race locale. Élevage extensif sur parcours naturels.",
    avatar: AVATAR_MALE, phone: '0550-50-60-70', rating: 4.7,
  },
  {
    id: 's6', name: 'Fezari Abdelouahab', type: 'Fellah', wilaya: 'Médéa',
    age: 60, experience: 35, landSize: 20,
    bio: "Fellah de la région de Médéa. Polyculture traditionnelle : blé, légumes, oliviers et vergers. Attaché aux méthodes agricoles ancestrales et durables.",
    avatar: AVATAR_MALE, phone: '0670-60-70-80', rating: 4.7,
  },
  {
    id: 's7', name: 'Garmel Brahim', type: 'Oléiculteur', wilaya: 'Tizi Ouzou',
    age: 52, experience: 25, landSize: 12,
    bio: "Oléiculteur en Grande Kabylie. Exploitation familiale d'oliviers centenaires. Production d'huile d'olive extra vierge de haute qualité pressée à froid.",
    avatar: AVATAR_MALE, phone: '0799-70-80-90', rating: 4.9,
  },
  {
    id: 's8', name: 'Gabour Fatah', type: 'Agriculteur', wilaya: 'Constantine',
    age: 42, experience: 14, landSize: 8,
    bio: "Agriculteur polyvalent de la région de Constantine. Production de céréales, légumes secs et maraîchage. Vente directe producteur-consommateur.",
    avatar: AVATAR_MALE, phone: '0555-80-90-10', rating: 4.6,
  },
  {
    id: 's9', name: 'Hafid Smail', type: 'Oléiculteur', wilaya: 'Tlemcen',
    age: 48, experience: 18, landSize: 9,
    bio: "Oléiculteur de Tlemcen. Oliviers variété Sigoise et Chemlali. Huile dorée aux arômes fruités. Vente en direct depuis la ferme et livraison nationale.",
    avatar: AVATAR_MALE, phone: '0660-90-10-20', rating: 4.8,
  },
  {
    id: 's10', name: 'Halimouche Yacine', type: 'Aviculteur', wilaya: 'Bouira',
    age: 30, experience: 6, landSize: 1,
    bio: "Jeune aviculteur dynamique spécialisé dans la production de poulets fermiers et d'œufs biologiques. Élevage en plein air sans antibiotiques.",
    avatar: AVATAR_MALE, phone: '0770-00-11-22', rating: 4.5,
  },
  {
    id: 's11', name: 'Hami Ali', type: 'Maraîcher', wilaya: 'Tipaza',
    age: 40, experience: 12, landSize: 5,
    bio: "Maraîcher de Tipaza spécialisé en cultures sous serre et en plein champ. Production de tomates, poivrons, courgettes et salades toute l'année.",
    avatar: AVATAR_MALE, phone: '0550-11-22-33', rating: 4.6,
  },
  {
    id: 's12', name: 'Halouane Smail', type: 'Élevage de bovins', wilaya: 'Blida',
    age: 46, experience: 20, landSize: 15,
    bio: "Éleveur bovin laitier de la Mitidja. Troupeau de vaches Holstein et Montbéliarde. Production de lait frais et génisses de qualité.",
    avatar: AVATAR_MALE, phone: '0555-22-33-44', rating: 4.7,
  },
  {
    id: 's13', name: 'Inidjouane Azdine', type: 'Agrumiculteur', wilaya: 'Chlef',
    age: 43, experience: 16, landSize: 18,
    bio: "Agrumiculteur de la vallée du Chélif. Vergers d'orangers, mandariniers et citronniers. Production certifiée GlobalG.A.P. Export vers l'Europe.",
    avatar: AVATAR_MALE, phone: '0661-33-44-55', rating: 4.8,
  },
  {
    id: 's14', name: 'Anou Bouzid', type: 'Arboriculteur', wilaya: 'Médéa',
    age: 57, experience: 30, landSize: 22,
    bio: "Arboriculteur expérimenté des montagnes de l'Atlas blidéen. Vergers de pommiers, poiriers, cerisiers et pruniers. Production fruitière de qualité supérieure.",
    avatar: AVATAR_MALE, phone: '0670-44-55-66', rating: 4.8,
  },
  {
    id: 's15', name: 'Benhamadache Lamine', type: 'Producteur de lait', wilaya: 'Sétif',
    age: 45, experience: 17, landSize: 10,
    bio: "Producteur laitier des hauts plateaux sétifiens. Troupeau de 40 vaches laitières. Livraison quotidienne de lait frais aux laiteries et particuliers.",
    avatar: AVATAR_MALE, phone: '0550-55-66-77', rating: 4.6,
  },
  {
    id: 's16', name: 'Boubekeur Karim', type: 'Viticulteur', wilaya: 'Mostaganem',
    age: 39, experience: 11, landSize: 7,
    bio: "Viticulteur de Mostaganem. Cépages locaux et internationaux. Production de raisins de table et de cuve. Exploitation modernisée avec irrigation goutte-à-goutte.",
    avatar: AVATAR_MALE, phone: '0799-66-77-88', rating: 4.5,
  },
  {
    id: 's17', name: 'Chami Mohamed', type: 'Élevage de volailles', wilaya: 'Annaba',
    age: 33, experience: 7, landSize: 2,
    bio: "Éleveur de volailles diversifié : poulets, dindes et canards. Alimentation naturelle et conditions d'élevage optimales pour une viande de qualité.",
    avatar: AVATAR_MALE, phone: '0555-77-88-99', rating: 4.4,
  },
  {
    id: 's18', name: 'Kouroughli Sadek', type: "Éleveur d'ovins", wilaya: 'Batna',
    age: 49, experience: 24, landSize: 0,
    bio: "Éleveur d'ovins des Aurès. Races locales Ouled Djellal et Hamra. Troupeau de 300 brebis. Élevage sur parcours naturels des steppes aurassiennes.",
    avatar: AVATAR_MALE, phone: '0660-88-99-00', rating: 4.7,
  },
  {
    id: 's19', name: 'Ouled Lime Djilali', type: 'Engraisseur de bovins', wilaya: 'Mascara',
    age: 53, experience: 26, landSize: 30,
    bio: "Engraisseur de bovins de Mascara. Spécialiste de l'engraissement intensif de taureaux. Alimentation maïs-ensilage. Vente de bœufs prêts à l'abattage.",
    avatar: AVATAR_MALE, phone: '0770-99-00-11', rating: 4.6,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────
export const mockProducts = [
  {
    id: 'p1', title: 'Plants de Tomates — Pépinière Certifiée', category: 'nursery',
    price: '25 DA', unit: '/plant', quantity: '5 000 plants', wilaya: 'Blida', sellerId: 's1', date: '2026-03-25',
    images: ['https://plus.unsplash.com/premium_photo-1722686608718-ae05489d2a1a?q=80&w=914&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: "Plants de tomates greffés prêts à la mise en place. Variétés : Zahra, Marmande et hybride F1. Élevés sous serre, racinaires robustes. Livraison possible sur toute la Mitidja.",
  },
  {
    id: 'p2', title: 'Blé Dur Semences Sélectionnées — Variété Waha', category: 'grains',
    price: '5 800 DA', unit: '/quintal', quantity: '20 Tonnes', wilaya: 'Tiaret', sellerId: 's2', date: '2026-03-22',
    images: ['https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&w=800'],
    description: "Semences de blé dur variété Waha. Taux de germination supérieur à 95 %. Stockage en silo climatisé. Idéal pour les hautes plaines occidentales.",
  },
  {
    id: 'p3', title: 'Miel de Thym Sauvage — Pur Kabylie', category: 'honey',
    price: '1 200 DA', unit: '/kg', quantity: '150 kg', wilaya: 'Béjaïa', sellerId: 's3', date: '2026-03-20',
    images: ['https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&w=800'],
    description: "Miel de thym 100 % naturel, récolté en altitude dans les montagnes de Kabylie. Couleur ambrée, arôme intense. Pots de 500 g et 1 kg disponibles.",
  },
  {
    id: 'p4', title: 'Poulets de Chair Fermiers — Prêts à Vendre', category: 'livestock',
    price: '420 DA', unit: '/kg vif', quantity: '800 unités', wilaya: 'Sétif', sellerId: 's4', date: '2026-03-28',
    images: ['https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&w=800'],
    description: "Poulets de chair élevés en semi-liberté, nourris au maïs et son de blé sans antibiotiques. Poids moyen 2,3 kg. Lot minimum 50 têtes.",
  },
  {
    id: 'p5', title: "Moutons Ouled Djellal — Prêts à l'Abattage", category: 'livestock',
    price: '58 000 DA', unit: '/tête', quantity: '30 têtes', wilaya: 'Djelfa', sellerId: 's5', date: '2026-03-24',
    images: ['https://images.pexels.com/photos/3540310/pexels-photo-3540310.jpeg?auto=compress&w=800'],
    description: "Béliers et brebis de race Ouled Djellal élevés sur parcours naturels des steppes de Djelfa. Poids entre 45 et 65 kg. Vaccinés et contrôlés vétérinairement.",
  },
  {
    id: 'p6', title: 'Pommes de Terre Locales — Récolte Fraîche', category: 'vegetables',
    price: '55 DA', unit: '/kg', quantity: '3 Tonnes', wilaya: 'Médéa', sellerId: 's6', date: '2026-03-26',
    images: ['https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&w=800'],
    description: "Pommes de terre variété Spunta cultivées à Médéa. Calibre moyen-grand. Conditionnement en sacs de 25 et 50 kg. Prix départ champ.",
  },
  {
    id: 'p7', title: "Huile d'Olive Extra Vierge — Première Pression", category: 'olives',
    price: '900 DA', unit: '/litre', quantity: '600 L', wilaya: 'Tizi Ouzou', sellerId: 's7', date: '2026-03-18',
    images: ['https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&w=800'],
    description: "Huile d'olive extra vierge issue d'oliviers centenaires de Grande Kabylie. Pression à froid traditionnelle. Acidité inférieure à 0,4 %. Bidons de 5 L et 10 L.",
  },
  {
    id: 'p8', title: 'Lentilles Vertes Locales — Récolte 2025', category: 'grains',
    price: '210 DA', unit: '/kg', quantity: '800 kg', wilaya: 'Constantine', sellerId: 's8', date: '2026-03-27',
    images: ['https://plus.unsplash.com/premium_photo-1671130295236-e8afa3ac38c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxlbnRpbHN8ZW58MHx8MHx8fDA%3D'],
    description: "Lentilles vertes cultivées sans intrants chimiques. Riches en protéines végétales. Cuisson rapide. Conditionnées en sacs de 5 kg.",
  },
  {
    id: 'p9', title: 'Olives de Table Sigoise — Conserve Maison', category: 'olives',
    price: '380 DA', unit: '/kg', quantity: '300 kg', wilaya: 'Tlemcen', sellerId: 's9', date: '2026-03-21',
    images: ['https://images.pexels.com/photos/4109907/pexels-photo-4109907.jpeg?auto=compress&w=800'],
    description: "Olives Sigoise préparées en saumure traditionnelle avec herbes aromatiques. Calibre XXL, charnues et savoureuses. Bocaux de 1 kg.",
  },
  {
    id: 'p10', title: 'Œufs Biologiques Plein Air — Plateau 30', category: 'dairy',
    price: '480 DA', unit: '/plateau 30', quantity: '200 plateaux', wilaya: 'Bouira', sellerId: 's10', date: '2026-03-29',
    images: ['https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: "Œufs de poules élevées en plein air à Bouira. Alimentation 100 % naturelle, sans OGM ni antibiotiques. Jaune orangé intense. Ramassage quotidien.",
  },
  {
    id: 'p11', title: 'Tomates Cerises Sous Serre — Grappe', category: 'vegetables',
    price: '150 DA', unit: '/kg', quantity: '500 kg', wilaya: 'Tipaza', sellerId: 's11', date: '2026-03-30',
    images: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800'],
    description: "Tomates cerises en grappe cultivées sous serre à Tipaza. Sucrées et juteuses, idéales pour la restauration et les marchés premium. Récolte tri-hebdomadaire.",
  },
  {
    id: 'p12', title: 'Lait de Vache Frais — Livraison Quotidienne', category: 'dairy',
    price: '85 DA', unit: '/litre', quantity: '300 L/jour', wilaya: 'Blida', sellerId: 's12', date: '2026-03-28',
    images: ['https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&w=800'],
    description: "Lait entier frais de vaches Holstein et Montbéliarde de la Mitidja. Traite matin et soir. Livraison à domicile ou enlèvement à la ferme.",
  },
  {
    id: 'p13', title: 'Oranges Navel — Calibre Export', category: 'citrus',
    price: '95 DA', unit: '/kg', quantity: '5 Tonnes', wilaya: 'Chlef', sellerId: 's13', date: '2026-03-23',
    images: ['https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&w=800'],
    description: "Oranges Navel de la vallée du Chélif. Sans pépins, sucrées et juteuses. Calibre 5-6, idéal pour l'export et la grande distribution. Caisses de 15 kg.",
  },
  {
    id: 'p14', title: 'Pommes Golden — Verger de Montagne', category: 'fruits',
    price: '130 DA', unit: '/kg', quantity: '2 Tonnes', wilaya: 'Médéa', sellerId: 's14', date: '2026-03-26',
    images: ['https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&w=800'],
    description: "Pommes Golden et Starkrimson cultivées en altitude dans l'Atlas blidéen. Croquantes, sucrées et parfumées. Calibre AA. Caisses bois de 18 kg.",
  },
  {
    id: 'p15', title: 'Fromage Frais Artisanal — Recette Kabyle', category: 'dairy',
    price: '320 DA', unit: '/kg', quantity: '80 kg/semaine', wilaya: 'Sétif', sellerId: 's15', date: '2026-03-25',
    images: ['https://images.pexels.com/photos/4187779/pexels-photo-4187779.jpeg?auto=compress&w=800'],
    description: "Fromage frais fabriqué artisanalement à partir du lait entier de vaches des hauts plateaux. Texture crémeuse, légèrement salé. Production hebdomadaire limitée.",
  },
  {
    id: 'p16', title: 'Raisins de Table — Muscat de Hambourg', category: 'grapes',
    price: '200 DA', unit: '/kg', quantity: '1 500 kg', wilaya: 'Mostaganem', sellerId: 's16', date: '2026-03-24',
    images: ['https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&w=800'],
    description: "Raisins Muscat de Hambourg. Grains noirs, charnus et sucrés avec un arôme musqué prononcé. Irrigation goutte-à-goutte. Livraison possible à Oran et Alger.",
  },
  {
    id: 'p17', title: 'Dindes Fermières — Poids 6 à 8 kg', category: 'livestock',
    price: '800 DA', unit: '/kg vif', quantity: '150 têtes', wilaya: 'Annaba', sellerId: 's17', date: '2026-03-22',
    images: ['https://images.unsplash.com/photo-1744222883533-f5173c08438b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fFR1cmtleXN8ZW58MHx8MHx8fDA%3D'],
    description: "Dindes fermières élevées en semi-liberté à Annaba. Alimentation maïs et fourrage. Poids vif 6 à 8 kg. Idéales pour fêtes et restaurants.",
  },
  {
    id: 'p18', title: 'Agneaux de Race Hamra — Aurès', category: 'livestock',
    price: '42 000 DA', unit: '/tête', quantity: '40 têtes', wilaya: 'Batna', sellerId: 's18', date: '2026-03-20',
    images: ['https://images.pexels.com/photos/2647045/pexels-photo-2647045.jpeg?auto=compress&w=800'],
    description: "Agneaux de race Hamra des Aurès. Élevage extensif sur parcours naturels. Poids entre 35 et 50 kg. Tous vaccinés et contrôlés. Livraison sur Batna et environs.",
  },
  {
    id: 'p19', title: "Taureaux Engraissés — Prêts à l'Abattage", category: 'livestock',
    price: '420 000 DA', unit: '/tête', quantity: '12 têtes', wilaya: 'Mascara', sellerId: 's19', date: '2026-03-19',
    images: ['https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&w=800'],
    description: "Taureaux croisés (Charolais × local) engraissés au maïs ensilage et orge pendant 6 mois. Poids vif moyen 450–500 kg. Documents sanitaires complets.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADS
// ─────────────────────────────────────────────────────────────────────────────
export const mockAds = [
  {
    id: 'ad1', company: 'AgriMech DZ',
    title: 'معدات زراعية وتراكتورات جديدة',
    description: 'جهّز مزرعتك بأحدث الآلات عالية الأداء. تخفيضات خاصة هذا الموسم.',
    image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
  {
    id: 'ad2', company: 'بذور وحبوب SA',
    title: 'بذور قمح معتمدة عالية المردود',
    description: 'حضّر موسمك مع أفضل البذور المتأقلمة مع المناخ الجزائري.',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
  {
    id: 'ad3', company: 'Irrigation Pro',
    title: 'حلول ري عصرية',
    description: 'أنظمة تنقيط، رش ومحوري. تركيب وصيانة في كل الجنوب الجزائري.',
    image: 'https://images.pexels.com/photos/7728867/pexels-photo-7728867.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
  {
    id: 'ad4', company: 'Agri Engrais PLUS',
    title: 'أسمدة ومبيدات معتمدة دولياً',
    description: 'أفضل الأسمدة لزيادة الإنتاج وتحسين جودة المحاصيل. استشارات فنية مجانية.',
    image: 'https://images.pexels.com/photos/348689/pexels-photo-348689.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
  {
    id: 'ad5', company: 'GreenHouse Solutions',
    title: 'بيوت بلاستيكية ذكية ومتطورة',
    description: 'تحكم في المناخ وزد من إنتاجك تأقل تكلفة. مناسبة لجميع أنواع الزراعات.',
    image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
  {
    id: 'ad6', company: 'طاقة شمسية للفلاحة',
    title: 'ألواح شمسية للمضخات الزراعية',
    description: 'قلل تكاليف الكهرباء واضمن رياً مستمراً باستخدام الطاقة الشمسية النظيفة.',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&w=1200',
    tag: 'إعلان مموّل',
  },
];