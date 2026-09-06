const pages=window.SEVIGNE_PAGES||[];
const LABELS={
"Établissement & instances":"Établissement & gouvernance","Organigrammes & services":"Qui fait quoi ?","Personnels":"Personnels & annuaire","Offre pédagogique & supérieur":"Pédagogie & parcours","Résultats":"Examens & orientation","Plateformes numériques":"Outils numériques","Horaires & lieux":"Horaires & lieux","Règlements & chartes":"Règlements & chartes","Charte numérique":"Numérique & sécurité des données","Procédures pratiques":"Procédures du quotidien","Urgences & orientation":"Urgences & plans","Sécurité":"Sécurité & évacuation","Calendriers & plannings":"Tous les calendriers","Association":"Association du Collège"};
const DESCS={
"Établissement & instances":"Projet d’établissement, instances, gouvernance et vie collective.","Organigrammes & services":"Directions, services administratifs, vie scolaire, santé, orientation et fonctions de chacun.","Personnels":"Listes des personnels, enseignants, responsabilités pédagogiques et annuaire.","Offre pédagogique & supérieur":"Parcours bilingues, BFI, Europe, dispositifs du primaire au lycée et offre du supérieur.","Résultats":"DNB, baccalauréat, admissions post-bac et résultats aux concours.","Plateformes numériques":"ÉcoleDirecte, Microsoft 365, Moodle, ressources documentaires et outils pédagogiques.","Horaires & lieux":"Horaires des classes, espaces et organisation des différents sites.","Règlements & chartes":"Règlements intérieurs, contrôle continu, évaluation, communication et options.","Charte numérique":"Règles d’usage, protection des données, mots de passe, équipements et cybersécurité.","Procédures pratiques":"Absences, achats, sorties, voyages, affichage, reprographie, clés et demandes courantes.","Urgences & orientation":"SAMU, accident en EPS et repérage dans les bâtiments.","Sécurité":"Consignes incendie, évacuation, confinement et situations d’intrusion.","Calendriers & plannings":"Tous les calendriers 2026–2027, organisés par catégories et par mois.","Association":"Modalités d’adhésion à l’Association du Collège Sévigné."};
const HIDE=new Set(["Ouverture","Sommaire"]);
const TITLE_OVERRIDES={14:'Services administratifs · secrétariats',15:'Ressources humaines',16:'Comptabilité & moyens généraux',17:'Sécurité, accueil, restauration & directions',18:'Directions de pôles · missions',19:'Vie éducative, documentation & organisation',20:'Vie scolaire · missions',21:'Orientation & service informatique',22:'Laboratoire & santé scolaire',23:'Santé scolaire · prévention'};
const sections=[...new Set(pages.map(p=>p.section))].filter(s=>LABELS[s]&&!HIDE.has(s));
function norm(s){return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function clean(t){return (t||'').replace(/\n{3,}/g,'\n\n').trim()}
function sectionPages(s){return pages.filter(p=>p.section===s)}
function titleFor(p){return (p.title&&p.title.length<120)?p.title:LABELS[p.section]||'Information'}


const dgPages=[6,7].map(n=>pages.find(p=>p.page===n)).filter(Boolean);
function extractDGText(){
  const raw=clean(dgPages.map(p=>p.text||'').join('\n\n'));
  const a=raw.indexOf('Le mot du directeur général');
  return clean(raw.slice(a>=0?a+'Le mot du directeur général'.length:0));
}
const dgWord={title:'Le mot du directeur général',text:extractDGText()};

const instancesData=[
  {
    name:'ASSEMBLEE GENERALE ET CONSEIL D’ADMINISTRATION',
    paragraphs:[
      'Tous les personnels de Sévigné peuvent adhérer à l’Association du Collège Sévigné en déposant une lettre et un chèque du montant de la cotisation annuelle fixée par l’Assemblée générale (20 €). Un modèle de lettre d’adhésion figure à la fin de ce livret. L’Assemblée générale se tient en janvier ou février, et les adhésions doivent être enregistrées au moins trois semaines avant cette date pour être valables lors des votes.',
      'L’adhésion est valable d’une Assemblée générale ordinaire à une autre.',
      'L’Assemblée générale élit un Conseil d’Administration constitué de 6 membres du personnel (enseignant ou non enseignant). Ces membres sont actuellement : Mmes Reboud, Cole, Bouat M. Daireaux et M.Verdon.',
      'Le président du Conseil d’Administration est M. William Marois.',
      'Les procès-verbaux des Assemblées et des Conseils d’administration sont publiés sur le site de l’établissement (collegesevigne.org).'
    ]
  },
  {
    name:'COMITE SOCIAL ET ECONOMIQUE (CSE)',
    paragraphs:[
      'Elu à Sévigné en 2023, le CSE remplace les anciennes instances représentatives du personnel (DUP et CHSCT).',
      "Le comité social et économique a pour mission d'assurer une expression collective des salariés permettant la prise en compte permanente de leurs intérêts dans les décisions relatives à la gestion et à l'évolution économique et financière, à l'organisation du travail, à la formation professionnelle.",
      'Le CSE se réunit tous les deux mois et les procès-verbaux sont affichés au 95, bd Arago, au 28 rue Pierre-Nicole et au 39 rue Henri-Barbusse. Ils sont communiqués par courrier électronique aux membres du personnel.',
      'Les membres élus titulaires sont : S. Capitaine, D. Cohen, K. Jaume (collèges des personnels cadres), M. Mezzache, F. Dussart-Mezouar (collège des personnels non-cadres)'
    ]
  },
  {
    name:'CONSEIL PEDAGOGIQUE DU SECONDAIRE',
    paragraphs:[
      'Le Conseil pédagogique est une instance de consultation des enseignants sur la politique éducative de l’établissement. Y sont représentés des professeurs de chaque discipline, principalement par les coordonnateurs.'
    ]
  },
  {
    name:'COMMISSION VSS',
    paragraphs:[
      "La commission VSS, dont les membres sont nommés par le chef d’établissement, et qui comprennent des enseignants, des personnels administratifs, des membres du pôle médical, de la Vie scolaire, des personnels de direction, des parents d’élèves et d’anciennes élèves intervient dans le cadre de la lutte contre les violences sexistes et sexuelles. Saisie par la direction ou n’importe quel membre de la communauté de Sévigné (parents, élèves, personnels), elle étudie les différents cas soumis sur la base de rapports écrits et d’enquêtes effectuées sur le terrain. Elle a un rôle consultatif et ne peut prononcer aucune sanction. Son adresse : commissionvss@collegesevigne.fr. Les membres de la commission sont Laure Hermand-Schébat, Vicky Vercruysse, Jeanne Weeber, Cécile Chéraqui, Giulia Puma, Astrid Quillien, Noémie Pérès, Sophie Laubel, Catherine Krzyzostaniak, Alan Yvon, M. N’Kom et Tony Alves. Cette commission traite le cas des élèves. Si vous êtes un(e) adulte travaillant dans l'établissement, vous pouvez demander l'aide du CSE et de sa référente harcèlement : Mme Maleka Mezzache."
    ]
  },
  {
    name:'CONSEIL DE LA VIE COLLEGIENNE ET LYCEENNE (CVC et CVL)',
    paragraphs:[
      'Le CVC et le CVL sont des lieux où les collégiens et les lycéens, mais aussi des parents d’élèves, sont associés aux décisions de l’établissement. Ils sont consultés sur des questions pédagogiques comme l’orientation, ainsi que sur les aspects de la vie collégienne et lycéenne, ils ont été consultés sur les aménagements des nouveaux locaux rue Pierre-Nicole.',
      'Les membres représentant le personnel sont au nombre de deux.'
    ]
  },
  {
    name:'COMITE D’EDUCATION A LA SANTE ET A LA CITOYENNETE (CESC) DU SECONDAIRE',
    paragraphs:[
      'Le CESC conçoit, met en œuvre et évalue les projets d’éducation à la citoyenneté, à la santé et à la prévention de la violence. Il organise des partenariats en fonction des problématiques éducatives à traiter. Il rassemble des représentants des personnels, des parents et des élèves.'
    ]
  },
  {
    name:'ASSOCIATIONS LIEES',
    paragraphs:[
      'Association des parents d’élèves qui désigne les parents délégués : APE.',
      'Association des Anciens Élèves du Collège Sévigné.',
      'Association sportive, affiliée à l’UNSS.'
    ]
  }
];

const orgaData={
  primaire:{title:'Enseignement primaire',root:'Jean-Pierre de Giorgio · Directeur général',branches:[
    {name:'Direction du primaire',person:'Catherine Krzyzostaniak',children:['Chrystel Gautier · Assistante de direction','Sophie Champay · Gestionnaire documentation','Équipe des enseignants du primaire','Équipe des ASEM, assistante primaire et AESH','Noémie Pérès · CPE / Vie scolaire','Hadhoum Khaldi · Accueil']},
    {name:'Services centraux',children:['Christine Marty · Comptabilité','Sophie Laubel · Ressources humaines','Coline Chebbi · Assistante RH','Damien Lanciaux · Moyens généraux','Vincent Barrage · Systèmes et réseaux','Anthony Oury · Parc informatique','France Merlini · Informatique','Caroline Prat · Communication']},
    {name:'Pôle santé',children:['Dr Bénédicte Beaupère · Médecin scolaire','Sandra Capitaine · Infirmière','Laure Hermand-Schebat · Psychologue']},
    {name:'Admissions',children:['Françoise Reding','Jennefer Cole']}
  ]},
  secondaire:{title:'Enseignement secondaire',root:'Jean-Pierre de Giorgio · Directeur général',branches:[
    {name:'Direction du secondaire',person:'Alan Yvon · Directeur',children:['Jeanne Weeber · Directrice adjointe','Isabelle Bouat · Assistante de direction','Mathilde Mahé · Assistante administrative','Astrid Mansley · Secrétaire polyvalente','Brice Triquet · Secrétaire polyvalent']},
    {name:'Vie scolaire & pédagogie',children:['Mickaël N’Kom · Référent collège','Tony Alves · Référent lycée','Équipe des AED','Équipe des enseignants','Valérie Bouchet & Anne-Lise Savieux · CDI','Barbara Denis · Orientation','Véronique Mallet · Laboratoire']},
    {name:'Services centraux',children:['Christine Marty · Comptabilité','Sophie Laubel · Ressources humaines','Coline Chebbi · Assistante RH','Damien Lanciaux · Moyens généraux','Vincent Barrage · Systèmes et réseaux','Anthony Oury · Parc informatique','France Merlini · Informatique','Caroline Prat · Communication']},
    {name:'Pôle santé',children:['Dr Bénédicte Beaupère · Médecin scolaire','Vicky Vercruysse · Infirmière','Laure Hermand-Schebat · Psychologue']},
    {name:'Admissions',children:['Françoise Reding','Jennefer Cole']}
  ]},
  superieur:{title:'Enseignement supérieur',root:'Jean-Pierre de Giorgio · Directeur général',branches:[
    {name:'Direction du supérieur',person:'Giulia Puma · Directrice',children:['Astrid Quillien · Adjointe','Émilie Marc · Assistante de direction','Lucas Decraene · Assistant de direction','Maleka Mezzache · Accueil et administratif','Agrégés répétiteurs et formateurs']},
    {name:'Services centraux',children:['Christine Marty · Comptabilité','Sophie Laubel · Ressources humaines','Coline Chebbi · Assistante RH','Damien Lanciaux · Moyens généraux','Vincent Barrage · Systèmes et réseaux','Anthony Oury · Parc informatique','France Merlini · Informatique','Caroline Prat · Communication']}
  ]}
};

const guides=[
{icon:'A',title:'Signaler une absence imprévue',lead:'Prévenir au plus vite et transmettre le justificatif.',steps:['Téléphoner dès que possible à l’accueil du secondaire ou du primaire ; un message peut être laissé avant la prise de service de l’accueil (7h45).','Confirmer par mail au secrétariat et à la vie scolaire l’absence et, si possible, la date précise de retour.','Rappeler le service dans la journée, si possible, pour donner des nouvelles.','Envoyer l’arrêt de travail à l’établissement dans les 48 heures.','Si l’état de santé le permet, transmettre à la Vie scolaire des consignes ou contenus d’activité pour les élèves.'],pages:[124,125,126,127]},
{icon:'€',title:'Faire une demande d’achat',lead:'Utiliser le formulaire et obtenir la validation du responsable.',steps:['Renseigner l’identité, le service ou département et la section concernée.','Indiquer le fournisseur, les références, quantités et prix ; joindre un devis si nécessaire.','Préciser la date, l’adresse et le contact de livraison.','Signer la demande et obtenir la signature du responsable de service, département ou laboratoire.'],pages:[128,144]},
{icon:'→',title:'Organiser une sortie au secondaire',lead:'Déposer la demande au plus tard deux semaines avant.',steps:['Renseigner objectifs pédagogiques, lieu, budget, date, horaires, classes et nombre d’élèves.','Déposer la demande auprès de Mathilde Mahé au plus tard deux semaines avant la sortie.','Faire renseigner l’avis de la vie scolaire et obtenir l’accord du directeur du secondaire.','Après validation, informer l’équipe pédagogique, les élèves et les familles.'],pages:[131]},
{icon:'✦',title:'Préparer un voyage scolaire',lead:'La demande est examinée l’année scolaire précédente.',steps:['Remettre la demande à Mathilde Mahé l’année scolaire qui précède le voyage.','Préciser destination, période, transport, accompagnateurs et objectifs pédagogiques.','Les demandes sont examinées globalement au mois de juin.','Obtenir la validation du directeur du secondaire et du directeur général.'],pages:[130,138]},
{icon:'+',title:'Inviter un intervenant extérieur',lead:'Autorisation préalable obligatoire.',steps:['Définir les objectifs pédagogiques, la classe, le nombre d’élèves, le lieu, la date et les horaires.','Indiquer l’identité ou l’organisme de l’intervenant et le budget éventuel.','Déposer la demande au plus tard deux semaines avant l’intervention.','Attendre l’avis de la vie scolaire et l’accord avant confirmation.'],pages:[132]},
{icon:'□',title:'Faire un affichage',lead:'Demande à déposer au secrétariat trois jours avant.',steps:['Joindre un exemplaire de chaque affichage prévu.','Préciser objectif, date de l’événement, nombre et lieux d’affichage.','Faire valider la demande.','Les affiches doivent porter le cachet de l’établissement et la signature de la direction.','Aucune affiche ne peut être scotchée sur un mur peint.'],pages:[133]},
{icon:'!',title:'Réagir en cas d’urgence',lead:'Accéder directement aux protocoles officiels du livret.',steps:['Observer la situation et sécuriser la personne ou le groupe.','Alerter l’infirmerie, sinon la direction et l’accueil ; en urgence, appeler le 15 ou le 112 selon le protocole.','Donner des informations précises et ne pas raccrocher le premier.','Appliquer les conseils donnés et prévenir la direction.'],pages:[145,146,147,148,149,150,151,152]},
{icon:'⌘',title:'Utiliser les outils numériques',lead:'Règles de sécurité, équipements et assistance.',steps:['Utiliser les outils et comptes institutionnels conformément aux règles du livret.','Ne jamais communiquer ses identifiants ou mots de passe.','Pour une demande de matériel, suivre la procédure d’attribution des ordinateurs et iPad.','En cas de difficulté, contacter le service informatique.'],pages:[112,113,114,115,116,117,118,119,120,121,122,123]}
];


const sectionGrid=document.querySelector('#sectionGrid');
document.querySelector('#dgWord')?.addEventListener('click',openDGWord);
sections.forEach(s=>{const b=document.createElement('button');b.className='section-card';b.innerHTML=`<h3>${LABELS[s]}</h3><p>${DESCS[s]||''}</p><b>${s==='Calendriers & plannings'?'Consulter →':'Entrer dans la rubrique →'}</b>`;b.onclick=()=>s==='Calendriers & plannings'?openAllCalendars():openSection(s);sectionGrid.appendChild(b)});

document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>openSection(b.dataset.section));
document.querySelector('#calendarNav')?.addEventListener('click',e=>{e.preventDefault();openAllCalendars()});

const MONTHS=[
  ['sep','Septembre'],['oct','Octobre'],['nov','Novembre'],['dec','Décembre'],['jan','Janvier'],['feb','Février'],['mar','Mars'],['apr','Avril'],['may','Mai'],['jun','Juin'],['jul','Juillet']
];
const monthLabel=key=>(MONTHS.find(x=>x[0]===key)||[key,key])[1];
const annualCalendar={
  sep:[['28 août','Accueil des nouveaux personnels · 10h'],['31 août','Rentrée scolaire primaire et secondaire · 9h']],
  oct:[['17 oct. → 2 nov.','Vacances d’automne · l’enseignement supérieur reste ouvert']],
  nov:[['21 nov.','Journée portes ouvertes · Primaire']],
  dec:[['5 déc.','Journée portes ouvertes · Secondaire'],['17 déc.','Fête de fin d’année'],['18 déc.','Journée de formation des personnels'],['19 déc. → 4 jan.','Vacances de fin d’année · fermeture des trois pôles']],
  jan:[['21 jan.','Vœux pour la nouvelle année']],
  feb:[['6 → 22 fév.','Vacances d’hiver']],
  apr:[['3 → 19 avr.','Vacances de printemps · l’enseignement supérieur reste ouvert'],['Début avril','Début des inscriptions dans le supérieur · concours de l’enseignement']],
  may:[['28 mai','Soirée caritative en faveur des BMS']],
  jun:[['Début juin','Début des cours dans le supérieur · premiers cours d’introduction'],['19 juin','Fête de l’établissement'],['25 juin','Fin des cours au secondaire']],
  jul:[['1er juil.','Fin des cours au primaire · au soir'],['2 juil.','Journée pédagogique primaire et secondaire · assemblée plénière · pot de fin d’année'],['2e semaine de juillet','Début des stages dans le supérieur']]
};
const secondaryCalendar={
  sep:[
    ['27 août','Vie scolaire · journée rentrée'],['28 août','09h30–14h00 · matinée d’accueil des nouveaux collègues, repas inclus'],['28 août','Vie scolaire · préparation accueil des élèves'],['31 août','Journée de prérentrée'],['1er sept.','Rentrée'],['1er sept.','Formations PPMS Terminale + accueil des élèves par les professeurs principaux + réunions de départements'],['2 sept.','Formations PPMS Terminale + journée d’accueil des 6e + réunions de départements'],['3 sept.','Début des cours selon les emplois du temps habituels'],['5 sept.','08h30–12h30 · matinée de rentrée des parents d’élèves'],['8 sept.','Tests de positionnement 6e'],['8 sept.','Appel à candidature CVC / CVL'],['10 sept.','19h00 · apéritif de rentrée APE primaire'],['14 → 18 sept.','Début des ateliers éloquence du lycée'],['14 sept.','Élections des délégués de classe'],['15 sept.','09h30 · exercice incendie 1'],['17 sept.','19h00 · apéritif de rentrée APE second degré'],['18 sept.','18h00 · réunion de rentrée des familles de 6e bilingues'],['21 sept.','Lancement de la campagne CVC / CVL'],['21 sept.','18h00 · 1re : réunion au sujet du cycle terminal'],['26 sept.','13h00–17h30 · Meet & Greet Renowned Universities'],['26 sept.','Validation du choix des options'],['28 sept.','18h00 · réunion de rentrée des familles de 5e et 4e bilingues'],['29 sept.','Conseil pédagogique 1']
  ],
  oct:[
    ['1er oct.','16h45 · élections des délégués CVL & CVC'],['1er oct.','Conseils intermédiaires & démarches de progrès · collège'],['1er oct.','Remontée des candidats aux Concours généraux'],['2 oct.','12h15 · CVL 1'],['5 oct.','Conseils intermédiaires & démarches de progrès · lycée'],['5 oct.','14h00 · exercice intrusion 1'],['5 oct.','18h00 · réunion de rentrée des familles de 3e et 2de bilingues'],['6 oct.','CVC 1'],['Début octobre','Réunion de rentrée des familles de 1res et Terminales BFI'],['12 oct.','Début de la préparation aux Concours généraux'],['12 → 16 oct.','Conseils intermédiaires & démarches de progrès · lycée, suite'],['17 oct. → 2 nov.','Vacances d’automne']
  ],
  nov:[
    ['2 nov.','Inscriptions aux examens · bac 1res + Terminales et DNB'],['2 nov.','Vie scolaire · début du tutorat élèves'],['10 nov.','CVL 2'],['10 nov.','Remise des diplômes · DNB'],['12 nov.','CVC 2'],['20 nov.','18h15 · remise des diplômes du bac'],['20 nov.','Fin du trimestre 1'],['23 → 28 nov.','Petites Tables · collège'],['24 nov.','18h15 · réunion d’information Parcoursup'],['30 nov.','Conseils de classe · 6A & 2A à 17h00 · 6C & 2B à 18h15']
  ],
  dec:[
    ['1er déc.','Conseils de classe · 6B & 2C à 17h00 · 4C & 2D à 18h15'],['2 déc.','13h45 · tests futurs 6e'],['2 déc.','Conseils de classe · 4B à 17h00 · 4A à 18h15'],['3 déc.','Conseils de classe · 3C à 17h00 · 3B à 18h15'],['5 déc.','Portes ouvertes'],['9 déc.','13h45 · tests futurs 6e'],['9 déc.','Conseils de classe · 5A à 17h00 · 5B à 18h15'],['10 déc.','Conseils de classe · 3A à 17h15 · 5C à 18h15'],['12 déc.','Forum des métiers'],['17 déc.','Fête de fin d’année'],['18 déc.','Journée pédagogique et formations · pas de cours'],['19 déc. → 4 jan.','Vacances de fin d’année']
  ],
  jan:[
    ['4 jan.','Conseils de classe · TC à 17h00 · TD à 18h15'],['5 jan.','Conseils de classe · TA à 17h00 · TB à 18h15'],['6 jan.','11h00 · exercice incendie 2'],['6 jan.','Conseils de classe · 1C à 17h00 · 1D à 18h15'],['7 jan.','Conseils de classe · 1A à 17h00 · 1B à 18h15'],['11 jan.','Réunion orientation 2de'],['11 → 14 jan.','Petites Tables · lycée'],['12 jan.','2de · « Forum » présentation des spécialités'],['12 jan.','18h15 · vœux du Collège Sévigné'],['14–15 jan.','DNB blanc n°1'],['20 jan.','13h45 · tests d’entrée en 2de'],['21 jan.','13h15 · conseil pédagogique n°3'],['21 jan.','17h30 · vœux pour 2027'],['26 jan.','Exercice intrusion 2 · à confirmer par les services du rectorat'],['26 jan.','18h15 · réunion orientation classes de 1re'],['27 jan.','13h45 · tests d’entrée en 2de']
  ],
  feb:[
    ['1er → 5 fév.','Stage des 3e'],['2 fév.','CVC 3'],['3 fév.','13h30–18h00 · PIX 1 · classes de Terminale'],['4 fév.','CVL 3'],['6 → 22 fév.','Vacances d’hiver'],['24 fév.','1res · oraux blancs EAF n°1']
  ],
  mar:[
    ['3 mars','1res · oraux blancs EAF n°1'],['8 mars','Conseils de classe · 6A & 2B à 17h00 · 6B & 2C à 18h15'],['9 mars','Conseils de classe · 5C + 2D à 17h00 · 2A & 6C à 18h15'],['10 mars','Conseils de classe · 2B & 3A à 17h00 · 2C & 3B à 18h15'],['15 mars','Conseils de classe · 1A à 17h00 · 1B & 3C à 18h15'],['16 mars','Conseils de classe · 1C & 4C à 17h00 · 1D & 4B à 18h15 · TA à 17h00 · TB + 4A à 18h15'],['17 mars','Conseils de classe · TC + 4B à 17h00 · TD à 18h15'],['18 mars','Oraux blancs DNB'],['18 mars','Conseil pédagogique 4'],['25 mars','14h00 · alerte incendie'],['29–30 mars','DNB blanc n°2']
  ],
  apr:[['3 → 19 avr.','Vacances de printemps']],
  may:[
    ['6 → 9 mai','Ascension · férié'],['10 → 14 mai','Conseils de classe cycle Terminale'],['10 → 14 mai','CVC 4 / CVL 4'],['17 mai','Pentecôte · férié'],['17 → 22 mai','Révisions bac BFI et semaine des voyages 4e'],['18 mai','Conseil pédagogique 4'],['18 mai','15h00 · exercice intrusion'],['26 mai','DNB oral'],['28 mai','Soirée caritative 2027']
  ],
  jun:[
    ['7 → 14 juin','Semaine des voyages classes de secondes'],['11 juin','Bac français · 1res'],['12 juin','Mathématiques · 1res'],['14 juin','Philosophie · 08h00–12h00'],['15 juin','Spécialité 1 · 14h00–18h00'],['16 juin','Spécialité 2 · 14h00–18h00'],['19 juin','Fête du Collège Sévigné'],['21 → 30 juin','Grand oral'],['22 juin','Début des conseils de classe · collège et 2des'],['24 juin → 1er juil.','Oraux de français'],['25 juin','DNB français · 09h00–12h15'],['28 juin','DNB histoire-géographie · 09h00–11h00 + sciences · 13h30–14h30'],['29 juin','DNB mathématiques · 09h00–11h00']
  ],
  jul:[['3 juil.','Résultats du bac + journée pédagogique et formation + plénière + verre de fin d’année'],['10 juil.','Fin de l’année scolaire']]
};
const trainingCalendar={
  oct:[['3 oct. · Terminales','BFI written LL · 4h'],['10 oct. · 1res','BFI written LL · 2h'],['10 oct. · Terminales','BFI written HG et HG LVA · LVA 3h / BFI 4h']],
  nov:[['3 nov. · 1res','LVB · 15h30–17h30 · 2h · horaires à vérifier avec EDT'],['7 nov. · Terminales','Philosophie · 4h'],['14 nov. · Terminales','Certification IELTS au British Council'],['14 nov. · 1res','Français · 4h'],['17 nov. · Terminales','LVB · 11h20–13h20 · 2h · horaires à vérifier avec EDT'],['21 nov. · 1res','HG et HG BFI · LVA 3h / BFI 4h'],['21 nov. · Terminales','Spé 1 · 4h'],['28 nov. · Terminales','Spé 2 · 4h'],['28 nov. · 1res','BFI written LL · 2h']],
  dec:[['30 nov. → 5 déc. · Terminales','Semaine d’oraux BFI'],['5 déc. · 1res','Rattrapage et seconde chance'],['5 déc. · Terminales','Rattrapage et seconde chance'],['12 déc. · 1res','Rattrapage et seconde chance'],['12 déc. · Terminales','Rattrapage et seconde chance']],
  jan:[['9 jan. · 1res','Spé 2 · 2h'],['9 jan. · Terminales','Philosophie · 4h'],['14–15 jan. · 3es','DNB blanc écrit n°1'],['16 jan. · 1res','Spé 3 · 2h · HLP 4h'],['16 jan. · Terminales','Spé 1 · 4h'],['23 jan. · Terminales','Spé 2 · 4h'],['26 jan. · 1res','Spé 1 · 2h · HLP 4h'],['Semaine du 25 jan. · Terminales','Oraux de LVB'],['30 jan. · 1res','Français · 4h']],
  feb:[['23 fév. · 1res','LVB · 15h30–17h00 · 1h30 · horaires à vérifier avec EDT'],['24 fév. · 1res','Oraux EAF n°1'],['27 fév. · Terminales','BFI written HG et HG LVA · LVA 3h / BFI 4h']],
  mar:[['1er → 5 mars · 2des','Épreuves mutuelles dont LVB'],['2 mars · 1res','Oraux de LVB'],['3 mars · 1res','Oraux EAF n°1'],['6 mars · 1res','Rattrapage et seconde chance'],['6 mars · Terminales','Rattrapage et seconde chance'],['9 mars · Terminales','LVB · 11h20–12h50 · 1h30 · horaires à vérifier avec EDT'],['13 mars · 1res','Rattrapage et seconde chance'],['13 mars · Terminales','Rattrapage et seconde chance'],['27 mars · Terminales','Philosophie'],['27 mars · 1res','BFI written LL'],['29–30 mars · 3es','DNB blanc écrit n°2']],
  apr:[['Semaine du 19 avr. · 1res','Oraux de LVB'],['Semaine du 19 avr. · Terminales','Oraux BFI'],['22 avr. · 3es','DNB oral blanc'],['24 avr. · Terminales','Spé 1 · 4h'],['24 avr. · 1res','Français · 4h']],
  may:[['11 mai · Terminales','Oraux LVB'],['15 mai · Terminales','Spé 2 · 4h'],['15 mai · 1res','Spé 1 · 2h · HLP 4h'],['19 → 28 mai · Terminales','Oraux blancs Grand oral n°1'],['21 mai · 1res','Spé 3 · 2h'],['22 mai · 1res','Spé 2 · 2h · HLP 4h'],['26 mai · 1res','Oraux EAF n°2'],['29 mai · 1res','Rattrapage et seconde chance ???']],
  jun:[['17–18 juin · Terminales','Oraux blancs Grand oral n°2 · semaine bac spécialités écrit']]
};
const travelCalendar={
  sep:[['21 sept.','Intégration 2des · Mme Mahé'],['25 → 27 sept.','Intégrations 6es · Mme Mahé']],
  oct:[['15 → 25 oct.','Washington · 4es bilingues · M. Wallace'],['18 → 23 oct.','Venise · Terminale HLP · Mme Attali'],['19 → 30 oct.','Chine · Terminale OIB · Mme Salcido']],
  jan:[['29 → 31 jan.','Angers · Terminale option cinéma · Mme Cohen'],['31 jan. → 12 fév.','Mobilités individuelles avec Palo Alto · collège'],['31 jan. → 12 fév.','San Francisco · 4es ANG+ · Mme Russell']],
  feb:[['3 → 7 fév.','Rome MUN · lycéens éloquence / 3e · M. Riley'],['Vacances de février','Séjour à Francfort · 1B · Mme Volcot'],['Vacances de février','Athènes / Mycènes · TB · M. Sefer']],
  mar:[['Début mars','Séjour MUN à La Haye · lycéens éloquence · M. Riley'],['11 → 20 mars ?','Accueil Washington'],['21 mars → 2 avr.','Accueil San Francisco'],['24 → 26 mars','Strasbourg · 2B · M. Daireaux']],
  apr:[['Vacances d’avril','Road Trip USA · 1res BFI · M. Gaffney / M. Riley'],['19 → 26 avr.','Accueil des Berlinois'],['19 → 30 avr.','Accueil Palo Alto'],['28–29 avr.','Agrosystème et géosciences ou géologie et sport · 2A, 2D, 2B · Mme Catala ? / professeurs de sport ?']],
  may:[['19 mai','Écosystèmes 1res · spécialité SVT · Mme Joubert / Mme Catala ?'],['Date non renseignée','Accueil des Florentins']]
};
const calendarGroups=[
  {id:'annual',title:'Calendrier annuel',desc:'Vacances, rentrée, portes ouvertes, événements et fins de cours.',pages:[180]},
  {id:'primary',title:'Calendrier du primaire',desc:'Page réservée au calendrier du primaire dans le livret révisé.',pages:[181]},
  {id:'secondary',title:'Collège & lycée',desc:'Calendrier prévisionnel complet du secondaire 2026-2027.',pages:[182,183,184,185,186,187,188,189,190,191,192]},
  {id:'training',title:'Épreuves d’entraînement',desc:'Secondes, cycle terminal, DNB blancs, BFI, EAF, spécialités et langues.',pages:[193,194,195,196,197,198,199]},
  {id:'travel',title:'Voyages, mobilités & alternances',desc:'Voyages, intégrations, échanges, accueils et périodes Charlemagne.',pages:[199,200,201,202]}
];
function openAllCalendars(){
 panelKicker.textContent='2026–2027';panelTitle.textContent='Tous les calendriers';panelIntro.textContent='Retrouvez ici l’ensemble des calendriers et plannings présents dans le livret, avec une navigation mensuelle.';
 panelContent.innerHTML=`<div class="calendar-groups">${calendarGroups.map(g=>`<button class="calendar-card" data-calendar="${g.id}"><small>CALENDRIER</small><h3>${g.title}</h3><p>${g.desc}</p><b>Consulter →</b></button>`).join('')}</div>`;
 panelContent.querySelectorAll('[data-calendar]').forEach(b=>b.onclick=()=>openCalendarGroup(calendarGroups.find(g=>g.id===b.dataset.calendar)));
 showPanel();
}

const panel=document.querySelector('#panel'),panelTitle=document.querySelector('#panelTitle'),panelKicker=document.querySelector('#panelKicker'),panelIntro=document.querySelector('#panelIntro'),panelContent=document.querySelector('#panelContent');
function showPanel(){panel.classList.add('open');panel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closePanel(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-close]').forEach(x=>x.onclick=closePanel);document.addEventListener('keydown',e=>{if(e.key==='Escape')closePanel()});

function isHeadingLine(line){
  const t=(line||'').trim(); if(!t||t.length>105)return false;
  if(/^(ARTICLE|CHAPITRE|TITRE|PRÉAMBULE|PREAMBULE|SECTION)\b/i.test(t))return true;
  if(/^\d+[.)]\s*[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŒ]/.test(t))return true;
  if(/^\d+\)\s+/.test(t))return true;
  if(/^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŒ0-9][A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŒ0-9 &'’():,.\/-]{5,}$/.test(t))return true;
  if(/^(Notre établissement|Instances|Organisation|Calendrier|Règlement|Procédure|Sécurité|Pédagogie|Orientation|Numérique|Association|Vie scolaire|Ressources humaines|Comptabilité|Moyens généraux|Cuisine|Service santé|Service informatique|Laboratoire|Accueil|Direction|Admissions|Horaires|Résultats|Offre pédagogique)/i.test(t) && t.length<72)return true;
  return false;
}
function isDateLine(t){return /^(Lun\.?|Lundi|Mar\.?|Mard\.?|Mardi|Mer\.?|Merc\.?|Mercredi|Jeu\.?|Jeud\.?|Jeudi|Ven\.?|Vendredi|Sam\.?|Samedi|Dim\.?|Dimanche)\s*\d{1,2}[./-]\d{1,2}/i.test(t)||/^\d{1,2}[./-]\d{1,2}(?:[./-]\d{2,4})?$/.test(t)}
function joinWrapped(parts){return parts.join(' ').replace(/\s+([,.;:!?])/g,'$1').replace(/\s{2,}/g,' ').trim()}
function editorialBody(text){
 const raw=(text||'').replace(/\r/g,'');
 const lines=raw.split('\n').map(x=>x.trim());
 let out='', para=[], list=[], currentBullet=null, ordered=[];
 const flushPara=()=>{if(para.length){const t=joinWrapped(para);if(t)out+=`<p>${escapeHtml(t)}</p>`;para=[]}};
 const flushList=()=>{if(currentBullet){list.push(currentBullet);currentBullet=null}if(list.length){out+=`<ul class="editorial-list">${list.map(x=>`<li>${escapeHtml(joinWrapped(x))}</li>`).join('')}</ul>`;list=[]}};
 const flushOrdered=()=>{if(ordered.length){out+=`<ol class="editorial-steps">${ordered.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol>`;ordered=[]}};
 const flushAll=()=>{flushPara();flushList();flushOrdered()};
 let bulletPending=false;
 for(let i=0;i<lines.length;i++){
   let line=lines[i];
   if(!line){flushAll();continue}
   if(/^\d{1,3}$/.test(line)&&i===0)continue;
   if(line==='•'||line==='▪'||line==='-'){flushPara(); if(currentBullet){list.push(currentBullet);currentBullet=null} bulletPending=true; continue}
   const bullet=line.match(/^[-–•▪]\s*(.+)$/);
   if(bullet){flushPara();flushOrdered();if(currentBullet)list.push(currentBullet);currentBullet=[bullet[1]];bulletPending=false;continue}
   if(bulletPending){flushPara();flushOrdered();if(currentBullet)list.push(currentBullet);currentBullet=[line];bulletPending=false;continue}
   const num=line.match(/^\s*(\d+)\s*[-.)]\s*(.+)$/);
   if(num){flushPara();flushList();ordered.push(num[2]);continue}
   if(currentBullet){
      if(isHeadingLine(line)||/^[*][^*]/.test(line)){flushList()} else {currentBullet.push(line);continue}
   }
   if(ordered.length){
      if(isHeadingLine(line)||/^\d+\s*[-.)]/.test(line)){flushOrdered()} else {ordered[ordered.length-1]+=' '+line;continue}
   }
   if(isHeadingLine(line)){
      flushAll(); const level=/^(ARTICLE|CHAPITRE|TITRE|PRÉAMBULE|PREAMBULE)/i.test(line)?'h4':'h5';
      out+=`<${level}>${escapeHtml(line)}</${level}>`; continue;
   }
   if(/^\*.+/.test(line)){flushAll();out+=`<p class="source-note"><em>${escapeHtml(line.replace(/^\*\s*/,''))}</em></p>`;continue}
   if(/^[^:]{2,48}:\s*.+/.test(line) && line.length<130){flushAll();const [a,...rest]=line.split(':');out+=`<p class="label-line"><strong>${escapeHtml(a)} :</strong>${escapeHtml(rest.join(':'))}</p>`;continue}
   para.push(line);
 }
 flushAll(); return out;
}
function calendarBody(text){
 const raw=(text||'').replace(/\r/g,''); const lines=raw.split('\n').map(x=>x.trim()).filter(Boolean);
 let out='', current=null;
 const flush=()=>{if(current){out+=`<div class="calendar-entry"><time>${escapeHtml(current.date)}</time><div>${escapeHtml(joinWrapped(current.body))}</div></div>`;current=null}};
 for(const line of lines){
   if(isDateLine(line)){flush();current={date:line,body:[]};continue}
   if(/^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŒ]{3,}(?:\s+[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŒ]{3,})*$/.test(line)&&line.length<40){flush();out+=`<h4 class="calendar-month">${escapeHtml(line)}</h4>`;continue}
   if(current){current.body.push(line)}else{out+=`<p>${escapeHtml(line)}</p>`}
 }
 flush();return out;
}
function displayTitleFor(p){
 if(TITLE_OVERRIDES[p.page])return TITLE_OVERRIDES[p.page];
 let t=titleFor(p).replace(/^[-–•]\s*/,'').trim();
 if(!t||t.length>90||/^(définies par la|mise en œuvre des|Lun\.|Mar\.|Merc\.|Jeu\.|Ven\.)/i.test(t)){
   const first=(p.text||'').split('\n').map(x=>x.trim()).find(x=>x&&isHeadingLine(x));
   if(first)t=first;
 }
 return t||LABELS[p.section]||'Information';
}
function sourceArticle(p,opts={}){
 const lead=opts.lead?`<p class="article-lead"><em>${escapeHtml(opts.lead)}</em></p>`:'';
 const body=p.section==='Calendriers & plannings'?calendarBody(p.text):editorialBody(p.text);
 return `<article class="source-article" data-page="${p.page}"><header><small>PAGE ${p.page}</small><h3>${escapeHtml(displayTitleFor(p))}</h3>${lead}</header><div class="source-prose">${body}</div>${visualFor(p)}</article>`;
}
function readingShell(articles,lead=''){
 const nav=articles.map((p,i)=>`<button data-jump="${p.page}"><span>${String(i+1).padStart(2,'0')}</span>${escapeHtml(displayTitleFor(p))}</button>`).join('');
 return `<div class="reading-shell"><aside class="reading-nav"><p>Dans cette rubrique</p>${nav}</aside><div class="article-stream">${articles.map((p,i)=>sourceArticle(p,{lead:i===0?lead:''})).join('')}</div></div>`;
}
function bindReadingNav(){panelContent.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{const el=panelContent.querySelector(`[data-page="${b.dataset.jump}"]`);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})})}
function openGuide(g){panelKicker.textContent='ACCÈS PRATIQUE';panelTitle.textContent=g.title;panelIntro.textContent='';const selected=g.pages.map(n=>pages.find(x=>x.page===n)).filter(Boolean);panelContent.innerHTML=`<div class="article-stream">${selected.map((p,i)=>sourceArticle(p,{lead:i===0?g.lead:''})).join('')}</div>`;showPanel()}
function openDGWord(){panelKicker.textContent='';panelTitle.textContent=dgWord.title;panelIntro.textContent='';const body=escapeHtml(dgWord.text).replace(/\n\n+/g,'</p><p>').replace(/\n/g,'<br>');panelContent.innerHTML=`<article class="source-article director-word"><div class="source-prose"><p>${body}</p></div></article>`;showPanel()}
function renderMonthTabs(g){
 const available=MONTHS.filter(([k])=>g.data?.[k]?.length);
 if(!available.length)return '';
 const first=available[0][0];
 const tabs=available.map(([k,label],i)=>`<button class="month-tab${i===0?' active':''}" data-month="${k}">${label}</button>`).join('');
 const panes=available.map(([k,label],i)=>`<section class="month-pane${i===0?' active':''}" data-month-pane="${k}"><div class="month-heading"><small>2026–2027</small><h3>${label}</h3><span>${g.data[k].length} date${g.data[k].length>1?'s':''}</span></div><div class="month-events">${g.data[k].map(([date,text])=>`<article class="month-event"><time>${escapeHtml(date)}</time><p>${escapeHtml(text)}</p></article>`).join('')}</div></section>`).join('');
 return `<div class="monthly-calendar"><div class="month-tabs" role="tablist">${tabs}</div>${panes}</div>`;
}
function bindMonthTabs(){panelContent.querySelectorAll('.month-tab').forEach(btn=>btn.onclick=()=>{const root=btn.closest('.monthly-calendar');root.querySelectorAll('.month-tab').forEach(x=>x.classList.toggle('active',x===btn));root.querySelectorAll('.month-pane').forEach(x=>x.classList.toggle('active',x.dataset.monthPane===btn.dataset.month));btn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})})}
function renderPeriodsCalendar(){
 const blocks=[['A','Semaine paire'],['B','Semaine impaire'],['C','Rentrée aux vacances de Toussaint · 5 parcours de 6e, 5e et 4e'],['D','Après Toussaint jusqu’à Noël'],['E','Janvier aux vacances'],['F','Février aux vacances de printemps'],['G','Après les vacances de printemps'],['H','1er trimestre jusqu’à Noël'],['I','2e trimestre jusqu’aux vacances de printemps'],['J','Retour des vacances de printemps'],['K','Première période de chaque trimestre entre vacances'],['L','Deuxième période de chaque trimestre entre vacances'],['M','03/09 → 04/10 · parcours de 3e'],['N','07/10 → 22/11'],['O','23/11 → 11/01'],['P','12/01 → 14/02'],['Q','03/03 → 04/04'],['R','07/04 → 17/05'],['S','19/05 → 14/06']];
 return `<div class="period-grid">${blocks.map(([code,text])=>`<article><b>${code}</b><p>${text}</p></article>`).join('')}</div>`;
}
function openCalendarGroup(g){
 panelKicker.textContent='CALENDRIERS 2026–2027';panelTitle.textContent=g.title;panelIntro.textContent=g.desc||'';
 const selected=(g.pages||[]).map(n=>pages.find(p=>p.page===n)).filter(Boolean);
 if(g.id==='primary' && selected.every(p=>!(p.text||'').replace(/\d+/g,'').trim())){
   panelContent.innerHTML=`<div class="calendar-empty"><small>CALENDRIER DU PRIMAIRE</small><h3>Emplacement présent dans le livret</h3><p>La page 181 du livret révisé est réservée au calendrier du primaire mais ne comporte pas encore de dates détaillées. Aucune information n’est ajoutée.</p></div>`;showPanel();return;
 }
 panelContent.innerHTML=`<div class="article-stream calendar-stream">${selected.map((p,i)=>sourceArticle(p,{lead:i===0?g.desc:''})).join('')}</div>`;showPanel();
}
function renderInstances(){return `<div class="instances-source">${instancesData.map(x=>`<article class="source-article instance-article"><header><h3>${x.name}</h3></header><div class="source-prose">${x.paragraphs.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}</div></article>`).join('')}</div>`}
function renderOrga(org){return `<div class="orga-dynamic"><div class="orga-root">${org.root}</div><div class="orga-branches">${org.branches.map((b,i)=>`<details><summary><span>${b.name}${b.person?`<small>${b.person}</small>`:''}</span><b>+</b></summary><div class="orga-children">${b.children.map(c=>`<div>${c}</div>`).join('')}</div></details>`).join('')}</div></div>`}
function renderAllOrgas(){return `<div class="orga-tabs"><details open><summary>Primaire <b>+</b></summary>${renderOrga(orgaData.primaire)}</details><details><summary>Secondaire <b>+</b></summary>${renderOrga(orgaData.secondaire)}</details><details><summary>Supérieur <b>+</b></summary>${renderOrga(orgaData.superieur)}</details></div>`}
function institutionPages(ps){
 return ps.map(p=>{
   if(p.page!==8)return p;
   const raw=p.text||''; const cut=raw.indexOf('Notre établissement');
   return {...p,title:'Notre établissement & instances',text:cut>=0?raw.slice(cut):raw};
 });
}
function topicCard(p){return `<button class="section-card topic-card" data-topic="${p.page}"><small>PAGE ${p.page}</small><h3>${escapeHtml(displayTitleFor(p))}</h3><b>Ouvrir ce sujet →</b></button>`}
function openTopic(p){
 panelKicker.textContent=LABELS[p.section]||p.section;panelTitle.textContent=displayTitleFor(p);panelIntro.textContent='';
 panelContent.innerHTML=`<div class="article-stream single-topic">${sourceArticle(p)}</div>`;showPanel();
}

const qfqData=[
 {n:'01',title:'Direction générale',subtitle:'Pilotage stratégique et direction de l’établissement',pages:[15,16,17],people:[
  {name:'Jean-Pierre de Giorgio',role:'Directeur général',missions:['Définition du développement stratégique de l’établissement, en dialogue avec le Conseil d’administration','Sécurité des personnels et des biens, hygiène et salubrité','Pilotage administratif, pédagogique, éducatif et financier de l’établissement','Animation de l’équipe de direction (directeurs de pôle, services centraux)','Communication et partenariats pour développer le rayonnement de l’établissement','Cohésion et dialogue social','Rayonnement du caractère propre de l’établissement (laïcité, humanisme, plurilinguisme) à travers la valorisation de son histoire et de ses projets','Conception des maquettes pédagogiques des trois pôles et recrutement des personnels']}
 ]},
 {n:'02',title:'Directions de pôles',subtitle:'Primaire, secondaire et enseignement supérieur',pages:[15,16,17],people:[
  {name:'Catherine Krzyzostaniak',role:'Directrice du primaire',missions:['Mise en œuvre des axes stratégiques définis par la direction générale pour le primaire','Animation des équipes administratives, pédagogiques et éducatives (y compris le pôle santé) de l’enseignement primaire (conseils d’école, conseil des maîtres, conseils de cycle)','Communication avec les familles et l’APE','Coordination des enquêtes VSS et harcèlement','Contribution à l’élaboration d’un plan de développement des compétences pour les enseignants, dans le cadre des lignes définies par la direction générale','Conception des emplois du temps','Supervision de l’organisation générale du pôle : calendriers, plannings, groupes, etc.']},
  {name:'Alan Yvon',role:'Directeur du secondaire, en charge du lycée',missions:['Mise en œuvre des axes stratégiques définis par la direction générale pour le secondaire','Animation des équipes administratives, pédagogiques et éducatives (y compris le pôle santé) de l’enseignement secondaire (conseils de classe, d’enseignement, pédagogiques)','Pilotage plus spécifique des projets et des missions du lycée','Communication avec les familles et l’APE','Coordination des enquêtes VSS et harcèlement','Contribution à l’élaboration d’un plan de développement des compétences pour les enseignants, dans le cadre des lignes définies par la direction générale','Conception des emplois du temps','Supervision de l’organisation générale du pôle : calendriers, plannings, groupes, etc.']},
  {name:'Jeanne Weeber',role:'Directrice adjointe du secondaire, en charge du collège',missions:['Supervision de la vie scolaire','Planning AED et ajustements quotidiens','Coordination DST, examens, étude du soir','Suivi pédagogique du collège (suivi des élèves, des projets pédagogiques, présidence de conseils de classe)','Aménagement des EDT élèves et professeurs au quotidien','Remplacement des absences (AED et professeurs), en liaison avec Isabelle Bouat pour les professeurs','Gestion des salles au quotidien','Contribution à la création des emplois du temps']},
  {name:'Giulia Puma',role:'Directrice de l’enseignement supérieur',missions:['Mise en œuvre des axes stratégiques définis par la direction générale pour le supérieur','Management de l’équipe du supérieur','Responsable de la qualité des maquettes et formations du catalogue du supérieur, de la bonne tenue du budget/chiffre équipe du supérieur','Développement de nouveaux parcours de formation (formation continue et formation de formateurs/formation d’établissement), impulser montée en gamme des outils de formation/de travail','Responsable des contenus/du calendrier destinés à la communication du pôle supérieur','Interlocutrice lors des audits Qualiopi','Dialogue et conduite de projet avec homologues des autres pôles','Conception, organisation, suivi des activités de recherche de l’établissement (séminaires, journées d’études, colloques, publications scientifiques)']},
  {name:'Astrid Quillien',role:'Adjointe de l’enseignement supérieur',missions:['Mise en œuvre des axes stratégiques définis par la direction générale pour le supérieur','Responsable de l’ensemble des préparations aux concours (CAPES et agrégations, internes et externes) et des certifications en Lettres (Classiques, Modernes, Théâtre)','Soutien aux actions de la direction et capacité à prendre le relai, force de proposition en situation de médiation et remédiation','Participation aux réunions de service, à la coordination du management de l’équipe, force de proposition pour amélioration des processus internes et des dispositifs pédagogiques des formations','Recrutement des formateurs du supérieur en Lettres, création de nouvelles maquettes, participation aux audits de qualité (Qualiopi)','Communication']}
 ]},
 {n:'01',title:'Secrétariats',subtitle:'Primaire, secondaire et enseignement supérieur',pages:[12,13],people:[
  {name:'Isabelle Bouat',role:'Assistante de direction du secondaire',missions:['Responsable du pôle secrétariat du secondaire','Gestion administrative des enseignants rémunérés par le Rectorat (paye, absence, …)','Absence des enseignants (Sévigné et rectorat) en liaison avec le service RH','Prise de rendez-vous avec Jean-Pierre de Giorgio','Liaison avec les services du rectorat','Suivi des missions des enseignants du secondaire','Gestion et supervision de la base Charlemagne – École Directe (élèves, adultes, familles, notes, LSL, …)','Inscriptions aux examens']},
  {name:'Brice Triquet',role:'Secrétaire polyvalent (familles, inscription) du secondaire',missions:['Suivi des inscriptions dans le secondaire (communication et suivi des dossiers)','Mise en place et supervision des tests d’admission (6e et seconde)','Organisation des rendez-vous familles et élèves avec la direction de pôle','Prise de rendez-vous pour Alan Yvon','Gestion de la base administrative élève']},
  {name:'Astrid Mansley',role:'Secrétaire polyvalent (examens blancs, DST, plannings, …) du secondaire',missions:['Organisation des devoirs sur table du samedi (recueil des sujets, répartition des élèves)','Organisation des oraux d’entraînement','Support à l’organisation des examens et concours nationaux','Gestion des différents plannings de certification, entraînement, tests…']},
  {name:'Mathilde Mahé',role:'Assistante administrative (voyages, sorties) du secondaire',missions:['Assiste les enseignants dans l’organisation administrative des voyages et des sorties (réservations, communication)','Communication avec les familles au sujet de la gestion administrative des voyages','Coordination des équipes d’accompagnateurs','Dialogue, sous la supervision des enseignants et de la direction, avec les établissements partenaires']},
  {name:'Chrystel Gautier',role:'Assistante de direction du primaire',missions:['Suivi des enseignants rémunérés par le rectorat','Liaison avec les services du rectorat','Suivi des dossiers de préinscriptions, d’inscriptions et de réinscriptions','Lien avec la comptabilité pour le suivi des dossiers familles','Communication avec les familles','Accueil','Prise de rendez-vous pour Catherine Krzyzostaniak']},
  {name:'Lucas Decraene',role:'Assistant administratif et pédagogique du supérieur · Valorisation des archives · Référent handicap',missions:['Responsable du secrétariat des étudiants','Suivi des inscriptions aux concours et certifications','Suivi des étudiants au cours de leur scolarité','Lien avec la comptabilité pour le suivi du paiement des formations','Référent handicap pour les étudiants du supérieur','Classement des archives de l’établissement','Valorisation des archives et de l’histoire de l’établissement (expositions, interventions dans les classes, recherche et écriture)']},
  {name:'Emilie Marc',role:'Secrétaire de direction du supérieur',missions:['Responsable du secrétariat des formateurs du supérieur','Plannings et EDT des formateurs du supérieur','Contrats des formateurs, lien avec la comptabilité et les RH pour le paiement des formateurs','Suivi des enseignants au cours de l’année']},
  {name:'Maleka Mezzache',role:'Assistante polyvalente du supérieur',missions:['Renseignement des futurs inscrits, envoi des devis','Accueil des inscrits et des formateurs, en présence, installation des classes numériques, veille à leur bon enregistrement','Création des cartes, envoi des attestations d’assiduité']},
  {name:'Hadhoum Khaldi',role:'Hôtesse d’accueil polyvalente du primaire',missions:['Gestion de l’accueil de l’école primaire','Standard / secrétariat','Contrôle des entrées et sorties du bâtiment','Inscriptions des élèves à la cantine et garderie','Suivi des absences des élèves','Aide au passage des élèves à la cantine…']}
 ]},
 {n:'02',title:'Ressources humaines',subtitle:'Gestion des personnels et développement RH',pages:[13],people:[
  {name:'Sophie Laubel',role:'Responsable des ressources humaines',missions:['Gestion des personnels rémunérés par Sévigné','Relations sociales (CSE)','Pilotage développement RH : recrutement, formations','Suivi chiffré de la masse salariale','Conseil auprès de la direction générale, des directeurs de pôles et des responsables de service','Rédaction des contrats']},
  {name:'Coline Chebbi',role:'Assistante RH',missions:['Recrutement des AED','Suivi du temps de travail','Suivi des variables pour la paie','Gestion des absences et des remplacements','Suivi administratif des dossiers du personnel : organisation des visites médicales, des entretiens pro, inscriptions aux formations, mutuelle, prévoyance','Rédaction des contrats']}
 ]},
 {n:'03',title:'Comptabilité',subtitle:'Gestion comptable, fiscalité et pilotage financier',pages:[14],people:[
  {name:'Christine Marty',role:'Responsable comptabilité',missions:['Gestion comptable quotidienne : saisie des factures clients et fournisseurs ; enregistrement des notes de frais et des paiements ; rapprochements bancaires réguliers ; suivi des impayés et relances familles','Fiscalité et obligations légales : participation à l’inventaire des stocks ; établissement du bilan et du compte de résultat','Analyse et pilotage financier : suivi de la trésorerie au jour le jour ; participation à l’élaboration des budgets et réalisation de la comptabilité analytique ; lien direct avec l’expert-comptable et le commissaire aux comptes']}
 ]},
 {n:'04',title:'Moyens généraux',subtitle:'Bâtiments, achats, sécurité, entretien et accueil',pages:[14,15],people:[
  {name:'Damien Lanciaux',role:'Responsable des moyens généraux',missions:['Responsable des achats','Responsable de la sécurité des bâtiments','Suivi des opérations de maintenance dans les bâtiments','Suivi des chantiers de réparation, rénovation, réhabilitation','Responsable de l’équipe ménage','Suivi des entreprises de ménage'],team:['Équipe entretien : Hernando Lising — agent de service ; Roy Holgado — agent d’entretien et de ménage ; Mady Niakate — agent de service ; Maria Viera — agent de service','Équipe sécurité-accueil : Laurent Bloch, Laurent Dussolle, Claude Randriamananoro — agents de sécurité et d’accueil ; Falikou Diaby']}
 ]},
 {n:'05',title:'Cuisine',subtitle:'Restauration et organisation du service',pages:[15],people:[
  {name:'Laurent Guyonnet',role:'Chef de cuisine',missions:['Conception des menus, organisation des évènements festifs en concertation avec les services centraux','Gestion des stocks, inventaires, entretien du matériel','Respect des règles d’hygiène et de sécurité'],team:['Équipe cuisine et plonge : Lauro Aguila — commis de cuisine ; Peggy Vatusidi — commis de cuisine ; Hernando Lising — agent de service ; Mady Niakate — agent de service']}
 ]},
 {n:'07',title:'Vie éducative & documentation',subtitle:'Vie scolaire, AED, bibliothèques et CDI',pages:[17,18],people:[
  {name:'Noémie Pérès',role:'CPE du primaire',missions:['Chargée de l’organisation et le fonctionnement de la vie scolaire de l’école primaire','Mise en œuvre de la politique éducative élaborée en dialogue avec la direction','Organisation de la pause méridienne, suivi de l’équipe des AED du primaire, récréation, activités ponctuelles…','Interface entre la vie scolaire et l’ensemble de la communauté éducative','Soutien dans le suivi des élèves','Assure le lien avec les parents pour les problèmes du quotidien','Soutien aux enseignants pour la logistique des voyages, sorties, projets de classe','Organisation des activités périscolaires']},
  {name:'Mickaël N’kom',role:'Référent de niveaux Collège · AED du secondaire',missions:['Organisation de la Vie Scolaire, sous la supervision de l’adjointe à la direction du secondaire, Jeanne Weeber','Managers de proximité des AED','Vérification de l’adaptation des plannings et de la présence effective des AED à leurs postes','Remplacement des postes-clés en cas d’absences','Garantie d’un accueil permanent à la vie scolaire','Surveillance de la sécurité des élèves, respect du règlement intérieur, organisation des passages au self','Suivi éducatif et disciplinaire : participation aux conseils de classe ; suivi du climat scolaire et cohérence des sanctions ; résultats, absences, retards, orientation vers le pôle santé ou la direction, gestion des punitions et incidents ; accompagnement des délégués ; fonction d’alerte auprès des PP et de la direction ; organisation de sensibilisations','Relations élèves et familles : entretiens familles/élèves en cas de difficultés éducatives ou disciplinaires','Vie scolaire et vie culturelle : participation à la vie festive et citoyenne ; soutien aux projets pédagogiques et éducatifs du niveau','Lien transversal : relais direct auprès de l’adjointe pour signaler besoins et ajustements ; travail étroit avec les AED pour assurer la continuité éducative']},
  {name:'Référente de niveaux Lycée',role:'Nom non indiqué dans le tableau fonctionnel source',missions:['Le tableau source mentionne cette fonction dans le même bloc que l’organisation de la vie scolaire du secondaire, sans indiquer de nom distinct.']},
  {name:'AED du secondaire',role:'Équipe des assistants d’éducation',missions:['Surveillance des flux, couloirs, CDI','Accompagnement EPS','Gestion quotidienne des entrées/sorties, absences et retards','Encadrement éducatif dans un cadre exigeant et bienveillant','Sécurité des élèves à l’intérieur du bâtiment et lors des déplacements…']},
  {name:'Sophie Champay',role:'Gestionnaire documentation – Accueil École primaire',missions:['Assure la gestion documentaire de la bibliothèque et l’animation d’activités pédagogiques (prise en charge d’un groupe d’élèves…)','Veille documentaire','Assure l’enrichissement du fonds documentaire','Accueil / Standard']},
  {name:'Valérie Bouchet & Anne-Lise Savieux',role:'Professeures documentalistes dans l’enseignement secondaire',missions:['Le tableau fonctionnel renvoie à la suite du livret pour le détail de leurs missions (« Voir infra dans le livret »).']}
 ]},
 {n:'08',title:'Orientation',subtitle:'Collège, lycée, études à l’étranger et post-bac',pages:[19],people:[
  {name:'Barbara Denis',role:'Conseillère d’orientation',missions:['Met en place le projet d’orientation pour le collège et le lycée en lien avec les PP','Anime les séances collectives d’information sur l’orientation, conseil aux familles et aux élèves','Organise le forum de métiers','Gère les demandes et suit les procédures pour les demandes d’étude à l’étranger','Gère les dossiers post-bac (Parcoursup)','Suivi des stages en entreprise','Contribue à la mise en œuvre du parcours avenir en lien avec les PP']}
 ]},
 {n:'09',title:'Informatique',subtitle:'Systèmes d’information, assistance et parc',pages:[19],people:[
  {name:'Vincent Barrage',role:'Responsable des systèmes d’information : infogérance',missions:[]},
  {name:'Anthony Oury',role:'Adjoint du service informatique',missions:['Reprographie','Assistance aux utilisateurs, personnels et élèves (conseils, formation, dépannage…)','Gestion du parc informatique et de son entretien','Supervision du système d’information de l’établissement']},
  {name:'France Merlini',role:'Technicienne système et réseaux',missions:['Assistance aux utilisateurs, personnels et élèves (conseils, formation, dépannage…)','Gestion du parc informatique et de son entretien','Supervision du système d’information de l’établissement']}
 ]},
 {n:'10',title:'Laboratoire',subtitle:'Préparation scientifique et gestion du laboratoire',pages:[20],people:[
  {name:'Véronique Mallet',role:'Technicienne de laboratoire',missions:['Gestion du laboratoire : suivi des commandes, rangements, entretien du matériel','Assiste les professeurs des disciplines scientifiques dans la préparation des travaux pratiques (salles de laboratoire, matériels…)','Réalise le planning des ECE en lien avec les enseignants']}
 ]},
 {n:'11',title:'Santé scolaire',subtitle:'Médecine scolaire, infirmerie et psychologie',pages:[20,21],people:[
  {name:'Dr Bénédicte Beaupère · Sandra Capitaine · Vicky Vercruysse',role:'Médecin scolaire · Infirmière pour l’école primaire · Infirmière pour le collège et le lycée',missions:['Accueil des élèves à l’infirmerie, suivi des dossiers médicaux des élèves, organisation des visites médicales, commandes et suivi des stocks pour l’infirmerie','Gère les PAI, PPS','Visites médicales (docteur Beaupère)','Collabore étroitement avec les équipes enseignantes et la direction sur le plan éducatif et pédagogique','Organisation des premiers soins','Accueil des élèves qui sollicitent un rendez-vous pour des raisons de mal-être','Assure l’intégration et le suivi des élèves ayant des problèmes de santé, traitement','Organise, participe, développe des actions de prévention auprès des élèves en lien avec les directives de l’éducation nationale et le plan de santé élaboré par l’établissement']},
  {name:'Laure Hermand-Schebat',role:'Psychologue',missions:['Accompagnement psychologique et éducatif : soutien aux élèves rencontrant des difficultés personnelles, scolaires ou relationnelles','Coordination de l’éducation à la vie affective, relationnelle à la sexualité','Collaboration avec l’équipe éducative, pédagogique et les familles','Gère les PAP et PPS','Assiste la direction dans les situations complexes','Contribue à l’élaboration d’un plan de prévention dans le domaine de la santé mentale, en collaboration avec les autres membres du pôle santé','Anime des ateliers avec les élèves']}
 ]}
];
function qfqPerson(person){
 const missions=(person.missions||[]).length?`<ul>${person.missions.map(m=>`<li>${escapeHtml(m)}</li>`).join('')}</ul>`:`<p class="qfq-no-mission">Aucune mission supplémentaire n’est détaillée pour cette fonction dans le tableau source.</p>`;
 const team=person.team?`<div class="qfq-team">${person.team.map(t=>`<p>${escapeHtml(t)}</p>`).join('')}</div>`:'';
 return `<details class="qfq-person"><summary><span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(person.role)}</small></span><b>+</b></summary><div class="qfq-person-body">${missions}${team}</div></details>`;
}
function qfqService(service){
 const sources=service.pages.map(n=>`<figure><figcaption>Page ${n} du livret source</figcaption><img src="assets/pages/page-${String(n).padStart(3,'0')}.jpg" alt="Tableau source — page ${n}" loading="lazy"></figure>`).join('');
 return `<details class="qfq-service"><summary><span class="qfq-number">${service.n}</span><span class="qfq-service-title"><strong>${escapeHtml(service.title)}</strong><small>${escapeHtml(service.subtitle)}</small></span><b>+</b></summary><div class="qfq-service-body"><div class="qfq-people">${service.people.map(qfqPerson).join('')}</div><details class="qfq-source"><summary>Consulter le tableau original du livret</summary><div class="qfq-source-pages">${sources}</div></details></div></details>`;
}
function renderQfq(){
 return `<div class="qfq-v21"><div class="qfq-note"><span>i</span><p>Cet organigramme fonctionnel n’est pas exhaustif et ne se substitue pas aux fiches de poste. Il reprend ici, service par service et personne par personne, les fonctions indiquées dans le livret des personnels.</p></div><nav class="qfq-shortcuts">${qfqData.map((s,i)=>`<button data-qfq-jump="${i}"><span>${s.n}</span>${escapeHtml(s.title)}</button>`).join('')}</nav><div class="qfq-directory">${qfqData.map(qfqService).join('')}</div><details class="qfq-orgas-source"><summary>Voir aussi les organigrammes des trois pôles</summary><div class="qfq-orgas-images"><figure><figcaption>Primaire</figcaption><img src="assets/orga-primaire.png" alt="Organigramme du primaire"></figure><figure><figcaption>Secondaire</figcaption><img src="assets/orga-secondaire.png" alt="Organigramme du secondaire"></figure><figure><figcaption>Supérieur</figcaption><img src="assets/orga-superieur.png" alt="Organigramme du supérieur"></figure></div></details></div>`;
}
function bindQfq(){panelContent.querySelectorAll('[data-qfq-jump]').forEach(b=>b.onclick=()=>{const all=[...panelContent.querySelectorAll('.qfq-service')];const d=all[Number(b.dataset.qfqJump)];if(d){d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'})}})}




const primaryTeachers=[
 ['Petite Section','Marine Peigney','Francophone'],['Petite Section','Anne Vacher','Anglophone · lundi et mardi matin'],['Petite Section','Maëva Marcognet','ASEM'],['Moyenne et Grande Section','Annaëlle Seksik','Francophone'],['Moyenne et Grande Section','Clare Branch','Anglophone'],['Moyenne et Grande Section','Laure Brun · Voahangy Randriamanantena · Mary Pereira','ASEM'],['CP','Julia Abtan','Francophone'],['CP','Sarah Beal','Anglophone'],['CP','Elizabeth Botelho','Mardi et jeudi après-midi'],['CE1','Tuan Vu','Francophone'],['CE1','Sarah Neudoerffer','Anglophone'],['CE2 A / CE2 B','Isabelle Thervet · Illana Bischofberger · Erin Marohn','Équipe'],['CM1','Laure Lionnet','Francophone'],['CM1','Diana Wade','Anglophone'],['CM2','Claire Maisonobe','Francophone'],['CM2','Peggy Communal','Anglophone'],['Small Group English & remplacements','Tara Reboud',''],['Soutien & remplacements / Classe dehors','Isabelle Archambault · Elizabeth Botelho',''],['Assistante primaire AESH','Frédérique Dussart',''],['Intervenants','Myriam Attali-Pariente · Vincent Sullerot','Philosophie'],['Intervenante','Joëlle Garcenot','Musique'],['Intervenants','Patrick L’Hoste · Harold Boulanger · Tom Champ · Bertrand Mouscardes','EPS']
];
const secondaryTeachers=[
['Emeline Alvarez','PH-CH'],['Myriam Attali-Pariente','Philosophie'],['Annaïck Belahcène','Anglais'],['Renaud Besse','Cinéma'],['Julien Besson','Math'],['Michaela Bonnière','Anglais'],['Valérie Bouchet','Documentation / SNT'],['Harold Boulanger','EPS'],['Florence Brault','Math'],['Emeline Catala','SVT'],['Tom Champ','EPS'],['Catherine Charfi','Français'],['Gayané Charpin','Français / grec'],['Cécile Chéraqui','Éducation musicale'],['Delphine Cohen','Français'],['Jennefer Cole','Anglais'],['Laurence Creissen','Français'],['Brigitte Da Graça','HGGSP'],['Luc Daireaux','HG'],['Cheik Abdou Diop','NSI'],['Frédéric Dorothée','SES'],['Anne-Laure Dufour','Français'],['Karine Dufourmantelle','Math'],['Graciela Estrada','Espagnol'],['Hakima Faïd','Ph Ch'],['Craig Gaffney','Anglais'],['Alejandra Gomez','Espagnol'],['Jordi Gomez','SES'],['Anna Gray','SVT'],['Julia Hladky-Collet','HG - angl.'],['Jacqueline Horler','Arts plastiques'],['Krystel Jaume','Espagnol'],['Cécile Joubert','SVT'],['Thimoty Karpowitz','Ph Ch / SVT / Math'],['Milly La Delfa','Français'],['Elodie Léonard','Ph Ch'],['Claire Levy-Chevasson','Ph Ch'],['Patrick L’Hoste','EPS'],['Julien Maaza','EPS'],['Adrien Macé','Math'],['Fanny Malègue','HG'],['Emmanuel Martin','SES'],['Alex Marriott','EPS / techno / SNT'],['Paul Micheneau','HG'],['Barbara Milani','Italien'],['Bertrand Mouscardes','EPS anglais'],['Céline Mussard','Ph Ch'],['Marella Nappi','Français / latin / grec'],['Elliott O’ Toole','HG'],['Eric Penet','Allemand'],['Judith Perez','Français / grec'],['Fabrice Perrin','Math / SNT'],['Blandine Picard','Ph Ch'],['Eric Pons','Math'],['Jean-Marc Porteneuve','EPS'],['Wendy Prin-Conti','Français'],['Astrid Quillien','Français / latin / grec'],['Christopher Riley','Anglais'],['Julien Roger','Math'],['David Rose','Anglais'],['Kelly Russel','Anglais'],['Stéphanie Sabbaghi','Arabe'],['Fatima Salcido','HG – angl'],['Anne-Lise Savieux','CDI'],['Amina Semmoud','Anglais'],['Alexis Sefer','HG'],['Maria Stamminger','Anglais'],['Georgia Stopnicki','Arts plastiques'],['Vincent Sullerot','Philosophie'],['Laurence Thibaud','Français / latin / grec'],['Rodolphe Touzé','Ph Ch'],['Quentin Verdon','SVT'],['Judith Volcot','Hist-Géo'],['Mark Wallace','Anglais']
];
const phoneDirectory=[
['Arago','Sandra Capitaine','Infirmière scolaire',['01 44 08 71 24']],['Arago','Sophie Champay','Gestionnaire documentation',['01 44 08 71 25']],['Arago','Catherine Krzyzostaniak','Directrice du Primaire',['01 44 08 71 22','06 68 79 49 64']],['Arago','Chrystel Gautier','Assistante de direction du primaire',['01 44 08 71 26']],['Arago','Hadhoum Khaldi','Hôtesse d’accueil',['01 44 08 71 20']],['Arago','Portable sorties CP','Primaire',['07 66 40 87 53']],['Arago','Portable sorties CE1','Primaire',['07 75 71 88 21']],['Arago','Portable sorties CE2','Primaire',['07 49 65 46 91']],['Arago','Portable sorties CM1','Primaire',['07 44 93 79 97']],['Arago','Portable sorties CM2','Primaire',['07 69 87 10 96']],['Arago','Noémie Pérès','CPE Primaire',['01 44 08 71 23','07 43 55 31 94']],['Arago','Laure Hermand Schebat','Psychologue scolaire',[]],['Barbusse','Emilie Marc','Assistante de direction pour les enseignants',['01 53 19 07 47','06 61 81 57 26']],['Barbusse','Maleka Mezzache','Assistante polyvalente',['01 53 19 07 48','07 66 46 04 75']],['Barbusse','Giulia Puma','Directrice du supérieur',['01 53 19 07 44','07 61 83 38 62']],['Barbusse','Lucas Decraene','Assistant de direction pour les étudiants',['01 53 19 07 40']],['Barbusse','Astrid Quillien','Adjointe à la direction du supérieur',['01 53 19 07 45','06 61 81 56 59']],['Barbusse','AED de la vie scolaire du secondaire','',['01 75 77 28 95']],['Pierre-Nicole','Claude Randriamananoro / AED','Loge Pierre-Nicole · Agent de sécurité / accueil',['01 53 10 14 14']],['Pierre-Nicole','Laurent Bloch','Agent de sécurité / accueil',['En attente']],['Pierre-Nicole','Isabelle Bouat','Assistante de direction du secondaire',['01 53 10 14 17']],['Pierre-Nicole','Vincent Barrage','Responsable informatique',['01 75 77 28 96','07 64 77 43 18']],['Pierre-Nicole','Laurent Guyonnet','Second de cuisine',['01 53 10 14 20']],['Pierre-Nicole','Valérie Bouchet','Professeur documentaliste',['01 53 10 14 21']],['Pierre-Nicole','CSE','Élus du CSE',['01 53 10 14 27']],['Pierre-Nicole','Jean-Pierre de Giorgio','Directeur général',['01 53 10 14 10','06 07 16 83 39']],['Pierre-Nicole','Barbara Denis','Conseillère d’orientation',['01 53 10 14 11']],['Pierre-Nicole','Damien Lanciaux','Responsable moyens généraux',['01 75 77 28 94','06 66 16 78 59']],['Pierre-Nicole','Référent lycée','',['01 75 77 28 89']],['Pierre-Nicole','Service informatique','',['01 53 10 14 24']],['Pierre-Nicole','Sophie Laubel','Responsable RH',['07 60 30 75 28']],['Pierre-Nicole','Mathilde Mahé','Assistante administrative · sorties et voyages',['01 75 77 28 92']],['Pierre-Nicole','Véronique Mallet','Technicienne laboratoire',['01 75 77 28 93']],['Pierre-Nicole','Astrid Mansley','Secrétaire polyvalente · DST / Examens',['01 53 10 14 13']],['Pierre-Nicole','Christine Marty','Responsable comptable',['01 53 10 14 26','07 60 30 69 67']],['Pierre-Nicole','France Merlini','Technicienne informatique',['01 75 77 28 95','06 99 85 76 92']],['Pierre-Nicole','Mickaël N’Kome','Référent Collège',['01 53 10 14 25','07 59 52 23 41']],['Pierre-Nicole','Anthony Oury','Adjoint SI',['01 53 19 07 46']],['Pierre-Nicole','Françoise Reding','Chargée des admissions',['06 13 59 28 08']],['Pierre-Nicole','Anne-Lise Savieux','Professeur documentaliste',['01 53 10 14 18']],['Pierre-Nicole','Brice Triquet','Secrétaire polyvalent · admissions / réinscriptions',['01 53 10 14 29']],['Pierre-Nicole','Vicky Vercruysse','Infirmière scolaire',['01 53 10 14 22']],['Pierre-Nicole','Laure Hermand Schebat','Psychologue scolaire',['XXXXX']],['Pierre-Nicole','Vie scolaire','Bureau Vie scolaire',['01 53 10 14 28']],['Pierre-Nicole','Jeanne Weeber','',['01 53 10 14 12']],['Pierre-Nicole','Coline Chebbi','Assistante RH',['01 75 77 28 90']],['Pierre-Nicole','Alan Yvon','Directeur du secondaire',['01 53 10 14 23','06 03 41 30 34']],['Pierre-Nicole','Portable voyages secondaire','',['07 62 02 51 16']],['Pierre-Nicole','Portable voyages secondaire','',['07 61 19 99 46']],['Pierre-Nicole','Portable voyages secondaire','',['07 49 42 99 64']],['Pierre-Nicole','Admissions','Bureau polyvalent (6ème)',['01 75 77 28 91']]
];
function renderPersonnelData(page){
 if(page===23)return '<div class="teacher-section"><h4>Équipe du primaire</h4><p class="personnel-data-note">Présentation restructurée à partir de la liste du livret source.</p><div class="teacher-grid">'+primaryTeachers.map(x=>'<article class="teacher-card primary-teacher-card"><small>'+escapeHtml(x[0])+'</small><strong>'+escapeHtml(x[1])+'</strong>'+(x[2]?'<span>'+escapeHtml(x[2])+'</span>':'')+'</article>').join('')+'</div></div>';
 if(page===24||page===25)return '<div class="teacher-section"><h4>74 enseignants du secondaire</h4><p class="personnel-data-note">Une seule liste continue, en cartes lisibles sur mobile ; la discipline reste immédiatement visible.</p><div class="teacher-grid">'+secondaryTeachers.map(x=>'<article class="teacher-card"><strong>'+escapeHtml(x[0])+'</strong><span>'+escapeHtml(x[1])+'</span></article>').join('')+'</div></div>';
 if(page===26||page===27)return `<div class="pedagogy-responsibilities">
  <section class="responsibility-intro"><p class="personnel-eyebrow">SECONDAIRE</p><h4>Responsabilités pédagogiques</h4><p>Les fonctions de professeur principal et de coordonnateur structurent le suivi des élèves et le travail collectif des équipes.</p></section>
  <section class="responsibility-card"><h4>Professeur principal</h4><p>En concertation avec les membres de l’équipe éducative, au-delà de sa mission d’enseignant, le professeur principal est tout particulièrement chargé de l’information, du suivi individuel et de l’orientation des élèves.</p><div class="responsibility-columns"><div><h5>Coordination</h5><ul><li>Coordonner l’équipe pédagogique.</li><li>Participer à l’élaboration des actions et coordonner leur mise en œuvre.</li><li>Effectuer la synthèse des résultats des élèves et les présenter au conseil de classe et, s’il y a lieu, à la commission d’appel.</li></ul></div><div><h5>Aide & orientation</h5><ul><li>Aider l’élève à construire son projet personnel et préparer son orientation avec les référents, la psychologue et la direction.</li><li>Proposer les objectifs pédagogiques et les moyens permettant la réalisation de son projet.</li><li>Coordonner l’équipe pédagogique pour le suivi des stages.</li></ul></div><div><h5>Médiation & vigilance</h5><ul><li>Entretenir le dialogue avec tous les acteurs du système scolaire, notamment le conseiller d’orientation ou la psychologue.</li><li>Être l’interlocuteur privilégié des élèves et des parents.</li><li>Être attentif à l’absentéisme et aux conduites problématiques et en informer la direction.</li><li>Être consulté dans les cas de fautes graves mentionnés dans le livret.</li></ul></div></div></section>
  <section class="responsibility-card"><h4>Professeur coordonnateur</h4><p>Interlocuteur privilégié entre l’équipe de direction, l’intendance, l’inspecteur de la discipline et l’équipe des professeurs de la discipline.</p><ul class="mission-list"><li>Organiser et animer les réunions d’équipe et conseils d’enseignement.</li><li>Informer l’équipe des professeurs de la discipline.</li><li>Représenter l’équipe disciplinaire aux conseils pédagogiques.</li><li>Assurer le suivi du matériel et des ouvrages pédagogiques.</li><li>Veiller à l’harmonisation des pratiques pédagogiques.</li><li>Conseiller la direction dans l’établissement des services et faire remonter les vœux des équipes.</li></ul></section>
  <section class="responsibility-card"><p class="personnel-eyebrow">COORDONNATEURS DU SECONDAIRE</p><div class="coordinator-grid"><span><b>EPS</b>Harold Boulanger</span><span><b>Lettres</b>Gayané Charpin / W. Prin-Conti</span><span><b>Section bilingue & BFI</b>C. Gaffney</span><span><b>Certification anglais · Parcours Europe</b>M. Bonnière</span><span><b>Parcours Europe</b>M. Wallace</span><span><b>Histoire-géographie</b>Julia Hladky</span><span><b>LVB</b>Barbara Milani ?</span><span><b>Mathématiques</b>Julien Roger et Julien Besson</span><span><b>Sciences</b>Quentin Verdon</span></div><p class="source-caveat">Le livret source comporte également la mention « Luc Daireaux ? » sans discipline précisée.</p></section>
  <section class="responsibility-card"><p class="personnel-eyebrow">SUPÉRIEUR</p><h4>Agrégés répétiteurs</h4><p>Coordination des équipes pédagogiques, communication et cours de méthodologie avec les candidats.</p><div class="coordinator-grid"><span><b>Histoire & géographie</b>Annabelle Marin</span><span><b>Mathématiques</b>Adrien Macé</span><span><b>Philosophie</b>Vincent Sullerot</span><span><b>Physique-chimie</b>Antoine Perrin</span><span><b>Lettres</b>Astrid Quillien-adjointe</span><span><b>Espagnol</b>Jennefer Cole</span><span><b>Anglais</b>Ivanne Galant</span><span><b>SV – STU</b>Quentin Verdon</span></div></section>
 </div>`;
 if(page===28||page===29)return '<div class="teacher-section"><h4>Annuaire téléphonique 2026-27</h4><p class="personnel-data-note">Numéros repris de l’annuaire du livret. « XXXXX » et « En attente » sont conservés tels qu’indiqués dans la source.</p><div class="personnel-directory">'+phoneDirectory.map(x=>'<article class="directory-row"><span class="site">'+escapeHtml(x[0])+'</span><strong>'+escapeHtml(x[1])+'</strong><span class="role">'+escapeHtml(x[2])+'</span><span class="phones">'+(x[3].length?x[3].map(n=>/^0[1-9]/.test(n)?'<a href="tel:'+n.replace(/\s/g,'')+'">'+escapeHtml(n)+'</a>':'<em>'+escapeHtml(n)+'</em>').join(''):'<em>Non renseigné</em>')+'</span></article>').join('')+'</div></div>';
 return null;
}

// V23 — Personnels & annuaire : architecture claire, sans transcription brute des tableaux
const personnelLeadership={
 dg:{name:'Jean-Pierre de Giorgio',role:'Directeur général'},
 poles:[
  {name:'Catherine Krzyzostaniak',role:'Directrice de l’école primaire',pole:'Primaire'},
  {name:'Alan Yvon',role:'Directeur de l’enseignement secondaire',pole:'Secondaire'},
  {name:'Giulia Puma',role:'Directrice de l’enseignement supérieur',pole:'Supérieur'}
 ]
};
const personnelTransversal=[
 {title:'Ressources humaines',people:[['Sophie Laubel','Responsable des Ressources Humaines'],['Coline Chebbi','Assistante RH']]},
 {title:'Moyens généraux',people:[['Damien Lanciaux','Responsable des moyens généraux']]},
 {title:'Comptabilité',people:[['Christine Marty','Responsable comptable']]},
 {title:'Informatique & communication',people:[['Vincent Barrage','Responsable système et réseaux'],['Anthony Oury','Adjoint, responsable du parc informatique et du système d’information'],['France Merlini','Technicienne informatique'],['Caroline Prat','Chargée de communication']]},
 {title:'Pôle médical',people:[['Dr Bénédicte Beaupère','Médecin scolaire'],['Sandra Capitaine','Infirmière · primaire'],['Vicky Vercruysse','Infirmière · secondaire'],['Laure Hermand-Schebat','Psychologue']]},
 {title:'Pôle culture',people:[['Claire Luçon','Référente culture · primaire, secondaire, supérieur']]},
 {title:'Admissions',people:[['Françoise Reding','Responsable admissions'],['Jennefer Cole','Responsable admissions']]}
];
const personnelPoles=[
 {title:'Enseignement primaire',lead:'Catherine Krzyzostaniak · Directrice du primaire',groups:[
  {title:'Vie scolaire',people:[['Noémie Pérès','Conseillère principale d’éducation']]},
  {title:'Accueil & secrétariat',people:[['Chrystel Gautier','Assistante de direction'],['Hadhoum Khaldi','Hôtesse d’accueil polyvalente'],['Falikou Diaby','Accueil et sécurité']]},
  {title:'Documentation',people:[['Sophie Champay','Gestionnaire documentation · BCDI primaire']]}
 ]},
 {title:'Enseignement secondaire',lead:'Alan Yvon · Directeur · Jeanne Weeber · adjointe',groups:[
  {title:'Secrétariats & vie administrative',people:[['Isabelle Bouat','Assistante de direction du secondaire'],['Brice Triquet','Secrétaire polyvalent'],['Astrid Mansley','Secrétaire polyvalente'],['Mathilde Mahé','Assistante administrative · voyages et sorties']]},
  {title:'Orientation',people:[['Barbara Denis','Conseillère d’orientation']]},
  {title:'CDI',people:[['Valérie Bouchet','Professeure documentaliste'],['Anne-Lise Savieux','Professeure documentaliste']]},
  {title:'Accueil & sécurité · Pierre-Nicole',people:[['Claude Randriamananoro','Agent d’accueil et de sécurité'],['Laurent Bloch','Agent d’accueil et de sécurité'],['Laurent Dussolle','Agent d’accueil et de sécurité']]},
  {title:'Vie scolaire',people:[['Mickaël N’Kom','Référent collège'],['Référent lycée','Nom non renseigné dans la liste source']]},
  {title:'Laboratoire',people:[['Véronique Mallet','Technicienne de laboratoire']]},
  {title:'Entretien & restauration',people:[['Lauro Aguila','Employé de cuisine'],['Laurent Guyonnet','Second de cuisine'],['Roy Holgado','Agent d’entretien et de ménage'],['Hernando Lising','Agent de service'],['Madi Niakate','Agent d’entretien'],['Peggy Vatusidi','Employée de cuisine'],['Maria Vieira','Agent de service']]}
 ]},
 {title:'Enseignement supérieur',lead:'Giulia Puma · Directrice · Astrid Quillien · adjointe',groups:[
  {title:'Secrétariats',people:[['Emilie Marc','Assistante de direction · enseignants'],['Lucas Decraene','Assistant de direction · étudiants']]},
  {title:'Accueil',people:[['Maleka Mezzache','Agent d’accueil et administratif']]},
  {title:'Archives de Sévigné',people:[['Lucas Decraene','Assistant archiviste · valorisation des archives']]}
 ]}
];
const personnelResources=[
 {page:23,title:'Enseignants du primaire',desc:'Maternelle, élémentaire, équipes francophone et anglophone.'},
 {page:24,title:'Enseignants du second degré',desc:'Liste des enseignants et disciplines · première partie.'},
 {page:25,title:'Enseignants du second degré · suite',desc:'Suite de la liste des enseignants et disciplines.'},
 {page:26,title:'Responsabilités pédagogiques',desc:'Professeurs principaux, coordonnateurs et responsabilités dans le supérieur.'},
 {page:27,title:'Rôles pédagogiques',desc:'Missions des professeurs principaux et des coordonnateurs.'},
 {page:28,title:'Annuaire téléphonique',desc:'Personnels non enseignants · Arago, Barbusse et Pierre-Nicole.'},
 {page:29,title:'Annuaire téléphonique · suite',desc:'Personnels non enseignants · Pierre-Nicole et services.'}
];
function personnelPersonCard([name,role]){return `<div class="personnel-person"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(role)}</span></div>`}
function renderPersonnelPage(){
 const services=personnelTransversal.map(x=>`<details class="personnel-service"><summary><span><strong>${escapeHtml(x.title)}</strong><small>${x.people.length} interlocuteur${x.people.length>1?'s':''}</small></span><b>+</b></summary><div class="personnel-service-body">${x.people.map(personnelPersonCard).join('')}</div></details>`).join('');
 const poles=personnelPoles.map(x=>`<details class="personnel-pole"><summary><span><strong>${escapeHtml(x.title)}</strong><small>${escapeHtml(x.lead)}</small></span><b>+</b></summary><div class="personnel-pole-body">${x.groups.map(g=>`<section class="personnel-group"><h4>${escapeHtml(g.title)}</h4><div class="personnel-people-grid">${g.people.map(personnelPersonCard).join('')}</div></section>`).join('')}</div></details>`).join('');
 const resources=personnelResources.map(r=>`<button class="personnel-resource" data-personnel-topic="${r.page}"><span>PAGE ${r.page}</span><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.desc)}</small><b>Ouvrir →</b></button>`).join('');
 return `<div class="personnel-v23">
   <section class="personnel-command"><p class="personnel-eyebrow">DIRECTION GÉNÉRALE</p><article class="personnel-dg"><small>Direction de l’établissement</small><h3>${escapeHtml(personnelLeadership.dg.name)}</h3><p>${escapeHtml(personnelLeadership.dg.role)}</p></article>
   <p class="personnel-eyebrow personnel-poles-label">DIRECTIONS DE PÔLES</p><div class="personnel-poles-grid">${personnelLeadership.poles.map(p=>`<article><small>${escapeHtml(p.pole)}</small><h4>${escapeHtml(p.name)}</h4><p>${escapeHtml(p.role)}</p></article>`).join('')}</div></section>
   <section class="personnel-block"><header><p class="personnel-eyebrow">SERVICES TRANSVERSAUX</p><h3>Les interlocuteurs communs aux trois pôles</h3></header><div class="personnel-services">${services}</div></section>
   <section class="personnel-block"><header><p class="personnel-eyebrow">PAR PÔLE</p><h3>Explorer les équipes</h3><p>Ouvrez un pôle pour retrouver ses services et les personnes qui y sont rattachées.</p></header><div class="personnel-poles-accordion">${poles}</div></section>
   <section class="personnel-block personnel-resources-block"><header><p class="personnel-eyebrow">LISTES & ANNUAIRE</p><h3>Enseignants, responsabilités et téléphones</h3><p>Ces documents reprennent les listes détaillées du livret source.</p></header><div class="personnel-resources">${resources}</div></section>
 </div>`;
}
function bindPersonnelPage(){panelContent.querySelectorAll('[data-personnel-topic]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.personnelTopic),html=renderPersonnelData(n);if(html){panelKicker.textContent='PERSONNELS & ANNUAIRE';panelTitle.textContent=n===23?'Enseignants du primaire':(n===24||n===25?'Enseignants du second degré':(n===26||n===27?'Responsabilités pédagogiques':'Annuaire téléphonique'));panelIntro.textContent='';panelContent.innerHTML='<button class="back-to-section" type="button">← Retour à Personnels & annuaire</button>'+html;const back=panelContent.querySelector('.back-to-section');if(back)back.onclick=()=>openSection('Personnels');panelContent.scrollTop=0;}else{const p=pages.find(x=>x.page===n);if(p)openTopic(p)}})}



// V26 — Pédagogie & parcours : lecture éditoriale structurée à partir des pages 30 à 40 du livret source
const pedagogyPathways = {
  bilingual:[
    {k:'PRIMAIRE',t:'Une éducation plurilingue pour tous',d:'Dès la petite section, l’anglais accompagne les apprentissages. De la MS au CM2, l’enseignement est organisé en français et en anglais à parité horaire. En CM1 et CM2, les élèves bénéficient aussi d’une initiation au mandarin : 45 minutes par semaine sur un semestre.',tags:['PS : 25 % en anglais','MS → CM2 : parité français / anglais','CM1–CM2 : mandarin']},
    {k:'COLLÈGE',t:'Parcours bilingue',d:'Le parcours bilingue structure une progression renforcée en anglais, Social Studies et sciences. En 3e, il conduit à une préparation de l’IGCSE. Un parcours Anglais+ permet également de converger vers le bilingue à partir de la 3e.',tags:['6e : anglais + Social Studies + sciences','5e–4e : progression renforcée','3e : littérature + IGCSE']},
    {k:'LYCÉE',t:'BFI · section américaine',d:'La section américaine du BFI est homologuée par le ministère de l’Éducation nationale depuis 2018. La formation associe littérature, histoire en anglais, histoire en français et, à partir de la première, Connaissance du monde.',tags:['2de : IGCSE','1re : BFI + Connaissance du monde','Tle : littérature + histoire bilingue']}
  ],
  primary:[
    ['Maternelle','Nouvel espace Sciences, « classe dehors » et atelier philosophie en grande section.'],
    ['Citoyenneté','Élection des délégués dès le CP, éco-délégués en CM1-CM2 et heures de vie de classe.'],
    ['Sciences & mathématiques','Fête des sciences avec le secondaire, espace dédié, robots connectés au cycle 3 et méthode des mathématiques de Singapour.'],
    ['Projets bilingues','Un projet interdisciplinaire commun à chaque niveau, travaillé dans les deux langues avec un produit final.'],
    ['Ateliers extrascolaires','Chorale, comédie musicale, judo, culture chinoise, échecs, coding, sciences, vidéo, yoga, théâtre et ateliers créatifs.']
  ],
  secondary:[
    ['Parcours complémentaires','PIX, santé, citoyenneté, écologie, grammaire et mathématiques complètent les enseignements obligatoires de la 6e à la 3e.'],
    ['Humanités & langues','Ateliers d’écriture en français et en anglais, initiation au latin et au grec, chinois en 6e et anglais oral renforcé en Anglais+.'],
    ['Sciences','Présence renforcée au laboratoire dès la 6e et la 5e, dans une démarche interdisciplinaire d’initiation scientifique.'],
    ['Arts','Théâtre avec le Cours Florent, ensemble vocal et instrumental, culture et pratiques artistiques, cinéma, ciné-club et master classes.'],
    ['Rhétorique en 2de','Module d’exploration consacré à l’expression orale, avec un ancrage disciplinaire.'],
    ['Math & logique','Module optionnel pour pratiquer les mathématiques hors du cadre du programme, sans évaluation.']
  ],
  europe:{t:'Parcours Europe · de la 2de à la Terminale',d:'Fondé sur une pédagogie de projet, le Parcours Europe étend l’esprit de l’option Euro à plusieurs disciplines. Il associe anglais renforcé, droit, géopolitique, sciences et réflexion sur la démocratie européenne.',items:['Objectif linguistique : niveau C1 en terminale','Initiation au droit et à la géopolitique','Module scientifique autour de l’eau et de l’environnement','Partenariats avec des lycées européens, dont Jean Monnet à Bruxelles','En 1re et Tle : enseignement scientifique en anglais','Voyage d’étude en 1re : Francfort et la BCE','Voyage d’étude en Tle : Athènes et le Pirée']},
  community:[
    ['Les conférences de Sévigné','Environ six conférences thématiques du primaire au lycée.'],
    ['Les Midis de Sévigné','Séminaire consacré aux travaux de recherche et centres d’intérêt des enseignants.'],
    ['L’École des parents','Rencontres autour de la parentalité, en partenariat avec le laboratoire LaPsyDÉ.'],
    ['Actrices de la petite enfance','Séminaire de recherche consacré à l’histoire de l’éducation des très jeunes élèves, en partenariat avec Tempora.'],
    ['CDI','Espaces collège, lecture, lycée et médias ; projets interdisciplinaires, EMI, Radio Sévigné, SéviGNEWS et ressources numériques via ESIDOC.']
  ],
  higher:[
    ['Concours de l’enseignement','Préparations au CRPE, aux CAPES et aux agrégations, avec des formats adaptés aux situations des candidats.'],
    ['Autres concours & certifications','Préparation au concours de personnel de direction, certifications complémentaires, Prépa Louvre et préparations cinéma.'],
    ['Méthode Sévigné','Accompagnement individualisé et liberté de choisir supports et modalités : papier ou numérique, synchrone ou asynchrone.'],
    ['Formation continue','Le supérieur joue aussi un rôle de centre de formation continue pour les enseignants de l’établissement et pour des publics extérieurs.'],
    ['Recherche & histoire','L’IRCS structure deux axes : histoire de l’éducation et innovation pédagogique, avec des partenariats universitaires, journées d’études, publications et valorisation des archives.']
  ]
};
function pathwayCard(x){return `<article class="pathway-card"><p class="pathway-kicker">${x.k}</p><h4>${x.t}</h4><p>${x.d}</p><div class="pathway-tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`}
function miniPathwayGrid(items){return `<div class="pathway-mini-grid">${items.map(([t,d])=>`<article><h5>${t}</h5><p>${d}</p></article>`).join('')}</div>`}
function renderPedagogyPathways(){return `<div class="pedagogy-v26">
  <header class="pedagogy-hero"><p class="personnel-eyebrow">PÉDAGOGIE & PARCOURS</p><h3>Trois pôles, une même ambition éducative</h3><p>Du primaire au supérieur, l’offre articule plurilinguisme, sciences, humanités, arts, orientation et recherche. Cette page organise les dispositifs du livret par grands parcours pour les rendre immédiatement lisibles.</p><nav class="pedagogy-jump"><a href="#ped-bilingue">Plurilinguisme</a><a href="#ped-primaire">Primaire</a><a href="#ped-secondaire">Secondaire</a><a href="#ped-europe">Europe</a><a href="#ped-superieur">Supérieur</a></nav></header>
  <section id="ped-bilingue" class="pedagogy-section"><div class="pedagogy-heading"><p>01</p><div><span>FIL ROUGE</span><h4>Du plurilinguisme au BFI</h4></div></div><div class="pathway-grid">${pedagogyPathways.bilingual.map(pathwayCard).join('')}</div></section>
  <section id="ped-primaire" class="pedagogy-section"><div class="pedagogy-heading"><p>02</p><div><span>ÉCOLE PRIMAIRE</span><h4>Explorer, expérimenter, grandir</h4></div></div>${miniPathwayGrid(pedagogyPathways.primary)}</section>
  <section id="ped-secondaire" class="pedagogy-section"><div class="pedagogy-heading"><p>03</p><div><span>COLLÈGE & LYCÉE</span><h4>Des parcours qui élargissent les disciplines</h4></div></div>${miniPathwayGrid(pedagogyPathways.secondary)}</section>
  <section id="ped-europe" class="pedagogy-section pedagogy-feature"><div class="pedagogy-heading"><p>04</p><div><span>LYCÉE</span><h4>${pedagogyPathways.europe.t}</h4></div></div><p class="feature-lead">${pedagogyPathways.europe.d}</p><ul>${pedagogyPathways.europe.items.map(x=>`<li>${x}</li>`).join('')}</ul></section>
  <section class="pedagogy-section"><div class="pedagogy-heading"><p>05</p><div><span>COMMUNAUTÉ ÉDUCATIVE</span><h4>Culture, recherche et documentation</h4></div></div>${miniPathwayGrid(pedagogyPathways.community)}</section>
  <section id="ped-superieur" class="pedagogy-section"><div class="pedagogy-heading"><p>06</p><div><span>ENSEIGNEMENT SUPÉRIEUR</span><h4>Concours, formation continue et recherche</h4></div></div>${miniPathwayGrid(pedagogyPathways.higher)}</section>
  <section class="pedagogy-source"><h4>Retrouver le texte intégral du livret</h4><p>Les informations ci-dessus sont réorganisées pour la lecture à l’écran. Les pages sources restent accessibles intégralement.</p><div class="pedagogy-source-buttons">${[30,31,32,33,34,35,36,37,38,39,40].map(n=>`<button type="button" data-topic="${n}">Page ${n}</button>`).join('')}</div></section>
</div>`}
function openSection(s){
 let ps=sectionPages(s);panelKicker.textContent='SOMMAIRE';panelTitle.textContent=LABELS[s];panelIntro.textContent=DESCS[s]||'';
 if(s==='Résultats'){
   panelTitle.textContent='Résultats aux examens & Parcoursup';
   panelContent.innerHTML=`<div class="results-editorial"><div class="results-infographics"><figure><img src="assets/dnb-2026.jpg" alt="Infographie DNB 2026"><figcaption>DNB 2026</figcaption></figure><figure><img src="assets/bac-mentions-2026.jpg" alt="Infographie Baccalauréat 2026"><figcaption>Baccalauréat 2026</figcaption></figure><figure class="wide"><img src="assets/postbac-1.png" alt="Infographie Parcoursup 2026 — propositions et filières"><figcaption>Parcoursup 2026</figcaption></figure><figure class="wide"><img src="assets/postbac-2.png" alt="Infographie Parcoursup 2026 — dimension internationale"><figcaption>Parcoursup · dimension internationale</figcaption></figure></div><h3>Pages sources mises à jour</h3><div class="topic-index section-grid">${ps.map(topicCard).join('')}</div></div>`;panelContent.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{const p=pages.find(x=>x.page===Number(b.dataset.topic));if(p)openTopic(p)});showPanel();return
 }
 if(s==='Établissement & instances'){
   panelKicker.textContent='NOTRE ÉTABLISSEMENT';
   panelTitle.textContent='Instances';
   panelIntro.textContent='';
   panelContent.innerHTML=renderInstances();
   showPanel();return
 }
 if(s==='Personnels'){
   panelKicker.textContent='PERSONNELS & ANNUAIRE';
   panelTitle.textContent='Personnels, responsabilités & effectifs';
   panelIntro.textContent='Contenu intégral mis à jour à partir du livret relu du 31 août 2026.';
   panelContent.innerHTML=`<div class="topic-index section-grid">${ps.map(topicCard).join('')}</div>`;
 } else if(s==='Organigrammes & services'){
   panelKicker.textContent='QUI FAIT QUOI ?';
   panelTitle.textContent='Vos interlocuteurs, service par service';
   panelIntro.textContent='Ouvrez un service, puis une personne : fonctions et missions sont rattachées individuellement, conformément aux tableaux du livret des personnels.';
   panelContent.innerHTML=renderQfq();
   bindQfq();
 } else if(s==='Offre pédagogique & supérieur'){
   panelKicker.textContent='PÉDAGOGIE & PARCOURS';
   panelTitle.textContent='Du primaire au supérieur';
   panelIntro.textContent='Offre bilingue, dispositifs remarquables, CDI, enseignement supérieur, recherche et nouveautés 2026-27.';
   panelContent.innerHTML=`<div class="topic-index section-grid">${ps.map(topicCard).join('')}</div>`;
 } else {
   panelContent.innerHTML=`<div class="topic-index section-grid">${ps.map(topicCard).join('')}</div>`;
 }
 panelContent.querySelectorAll('[data-topic]').forEach(b=>{b.onclick=()=>{const p=pages.find(x=>x.page===Number(b.dataset.topic));if(p)openTopic(p)}});showPanel();
}
function visualFor(p){
 if(p.page>=11)return `<details class="source-facsimile"><summary>Voir la page originale du livret</summary><figure class="source-plan"><img loading="lazy" src="assets/pages/page-${String(p.page).padStart(3,'0')}.jpg" alt="Page ${p.page} du livret révisé"></figure></details>`;
 return ''
}
function escapeHtml(s){return (s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}

menuBtn.onclick=()=>nav.classList.toggle('open');nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));

// V36 — Livret relu du 31 août 2026 + Assistant documentaire : précision institutionnelle, lisibilité et ton cordial
const chatLauncher=document.querySelector('#chatLauncher'),chatbot=document.querySelector('#chatbot'),chatClose=document.querySelector('#chatClose'),chatForm=document.querySelector('#chatForm'),chatInput=document.querySelector('#chatInput'),chatMessages=document.querySelector('#chatMessages');
function toggleChat(open){chatbot.classList.toggle('open',open);chatbot.setAttribute('aria-hidden',open?'false':'true');if(open)setTimeout(()=>chatInput.focus(),50)}
chatLauncher.onclick=()=>toggleChat(true);chatClose.onclick=()=>toggleChat(false);
function chatAdd(html,who='bot'){const d=document.createElement('div');d.className=`chat-msg ${who}`;d.innerHTML=html;chatMessages.appendChild(d);chatMessages.scrollTop=chatMessages.scrollHeight;return d}
function visibleAssistantText(text){return String(text||'').replace(/^\s*(?:sources?|source)\s*:\s*.*$/gim,'').replace(/c[’']est tout ce que j[’']ai trouv[^.!?]*(?:[.!?]|$)/gi,'').replace(/je n[’']ai rien trouv[^.!?]*(?:[.!?]|$)/gi,'Le livret ne précise pas ce point.').replace(/je n[’']ai trouv(?:é|e) que/gi,'Le livret indique').replace(/les extraits?/gi,'le livret').replace(/d[’']après les extraits?/gi,'D’après le livret').trim()}
function assistantInline(s){return escapeHtml(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`(.+?)`/g,'<code>$1</code>')}
function renderAssistantText(text){
 const lines=visibleAssistantText(text).split(/\r?\n/),out=[];let para=[],list=null,items=[];
 const flushPara=()=>{if(para.length){out.push(`<p>${assistantInline(para.join(' '))}</p>`);para=[]}};
 const flushList=()=>{if(list&&items.length){out.push(`<${list}>${items.map(x=>`<li>${assistantInline(x)}</li>`).join('')}</${list}>`)}list=null;items=[]};
 for(const raw of lines){const line=raw.trim();if(!line){flushPara();flushList();continue}
   const h=line.match(/^#{1,3}\s+(.+)$/);if(h){flushPara();flushList();out.push(`<h4>${assistantInline(h[1])}</h4>`);continue}
   const b=line.match(/^[-•]\s+(.+)$/);if(b){flushPara();if(list&&list!=='ul')flushList();list='ul';items.push(b[1]);continue}
   const n=line.match(/^\d+[.)]\s+(.+)$/);if(n){flushPara();if(list&&list!=='ol')flushList();list='ol';items.push(n[1]);continue}
   flushList();para.push(line)
 }
 flushPara();flushList();return `<div class="assistant-answer">${out.join('')||'<p>Le livret ne précise pas ce point.</p>'}</div>`
}
function attachSources(d,sources,label='Dans le livret'){if(!sources||!sources.length)return;const src=document.createElement('div');src.className='chat-source';src.innerHTML=`<b>${escapeHtml(label)}</b><div class="chat-source-links">`+sources.slice(0,4).map((p,i)=>`<button class="chat-answer-link" data-i="${i}">${escapeHtml(p.title||p.section||'Livret')}<span>p. ${p.page}</span></button>`).join('')+'</div>';src.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>{const p=sources[i];toggleChat(false);openSectionAt(p.section,p.page)});d.appendChild(src)}
const STOP=new Set('le la les un une des de du d et ou a à au aux en dans pour par sur avec sans est sont qui que quoi quel quelle quels quelles comment je j nous vous il elle ils elles ce cette ces mon ma mes ton ta tes son sa ses notre votre leur leurs faire faut dois doit peut peux peut-on'.split(/\s+/));
function tokens(q){return norm(q).replace(/[^a-z0-9@. -]/g,' ').split(/\s+/).filter(w=>w.length>1&&!STOP.has(w))}
function scorePage(p,ts,q=''){const title=norm(p.title||''),label=norm(LABELS[p.section]||p.section),text=norm(p.text||''),hay=`${title} ${label} ${text}`;let sc=0;const phrase=norm(q).trim();if(phrase.length>4&&hay.includes(phrase))sc+=30;for(const t of ts){if(title.includes(t))sc+=10;if(label.includes(t))sc+=6;const n=hay.split(t).length-1;sc+=Math.min(n,8)}return sc}
function bestPages(q){const ts=tokens(q);if(!ts.length)return[];return pages.filter(p=>!HIDE.has(p.section)).map(p=>({p,s:scorePage(p,ts,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,6).map(x=>x.p)}
function sentenceHits(text,ts){const arr=clean(text).replace(/\n+/g,' ').split(/(?<=[.!?])\s+|\s{2,}/).map(s=>s.trim()).filter(s=>s.length>25);return arr.map(s=>({s,score:ts.reduce((n,t)=>n+(norm(s).includes(t)?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.s.length-b.s.length).slice(0,4).map(x=>x.s)}
function qfqLocalCandidates(q){
 const nq=norm(q),ts=tokens(q),flat=qfqData.flatMap(service=>(service.people||[]).map(person=>({service,person}))),named=flat.filter(x=>{const nn=norm(x.person.name).replace(/^(dr|mme|m)\.?\s+/,'');if(/^(aed|equipe|équipe|referent|référent|referente|référente|responsable|service|direction)/.test(nn))return false;return nn.length>4&&nq.includes(nn)});if(named.length)return named.slice(0,3);
 const ranked=flat.map(x=>{const role=norm(x.person.role),missions=norm((x.person.missions||[]).join(' ')),team=norm((x.person.team||[]).join(' ')),service=norm(x.service.title+' '+x.service.subtitle);let s=0;for(const t of ts){if(role.includes(t))s+=8;if(service.includes(t))s+=5;if(missions.includes(t))s+=3;if(team.includes(t))s+=2}if(/en charge du college/.test(nq)&&role.includes('en charge du college'))s+=80;if(/en charge du lycee/.test(nq)&&role.includes('en charge du lycee'))s+=80;if(/qui dirige/.test(nq)&&/(directeur|directrice)/.test(role))s+=30;if(/securite des batiments/.test(nq)&&missions.includes('securite des batiments'))s+=70;return {...x,s}}).filter(x=>x.s>=8).sort((a,b)=>b.s-a.s);return ranked.slice(0,3)
}
function qfqLocalAnswer(hits,q){
 if(!hits.length)return null;const multi=hits.length>1&&(/\bet\b|\bentre\b|\bqui sont\b/.test(norm(q)));const chosen=multi?hits.slice(0,3):hits.slice(0,1);
 const lines=chosen.map(x=>`- **${x.person.name}** — ${x.person.role}${(x.person.missions||[]).length?'. '+(x.person.missions||[]).slice(0,multi?1:3).join(' ; '):''}`);
 const src=[];for(const x of chosen)for(const n of (x.service.pages||[]).slice(0,1)){const p=pages.find(pg=>pg.page===n)||pages.find(pg=>pg.page===n-2);if(p&&!src.some(y=>y.page===p.page))src.push(p)}
 return {text:lines.join('\n'),pages:src}
}
function answerChat(q){const n=norm(q),structured=qfqLocalAnswer(qfqLocalCandidates(q),q);if(structured)return structured;const canned=[
[/absence|absent|arret de travail/,()=>`**En cas d’absence imprévue**, prévenez avant 8 h par courriel à **absences@collegesevigne.fr** ou appelez le standard dès 7 h 45. Informez le secrétariat, la vie scolaire et la direction, transmettez si possible une activité pour les élèves et adressez le justificatif ou l’arrêt de travail dans les 48 h.`],
[/panne|informatique|mot de passe|ordinateur/,()=>`**En cas de panne informatique**, écrivez à **informatique@collegesevigne.fr**. Le livret rappelle également de ne pas partager ses identifiants, de ne pas installer de logiciel sans autorisation et de verrouiller son poste en cas d’absence.`],
[/orientation|parcoursup|post.?bac/,()=>`**Barbara Denis**, conseillère d’orientation, est l’interlocutrice indiquée. Elle accompagne le projet d’orientation collège-lycée, conseille les familles et les élèves et suit notamment Parcoursup, les études à l’étranger et les stages.`],
[/sortie/,()=>`Pour une sortie au secondaire :\n1. Déposez la demande auprès de **Mathilde Mahé** au moins 15 jours avant.\n2. La vie scolaire vérifie le calendrier et les remplacements.\n3. La direction du secondaire valide la dimension pédagogique.\nLe livret prévoit au minimum deux accompagnateurs.`],
[/voyage/,()=>`Un voyage scolaire doit être demandé l’année scolaire précédente. La demande précise la destination, la période, le transport, les accompagnateurs et les objectifs pédagogiques, puis elle est soumise à la validation de la direction du secondaire et de la direction générale.`]
 ];for(const [re,fn] of canned)if(re.test(n))return {text:fn(),pages:bestPages(q)};
 const ps=bestPages(q),ts=tokens(q);if(!ps.length)return {text:`Le livret ne précise pas suffisamment ce point. Vous pouvez reformuler avec un nom, un service ou un terme plus précis.`,pages:[]};
 let hits=[];for(const p of ps)for(const s of sentenceHits(p.text,ts))hits.push({s,p});hits=hits.filter((x,i,a)=>a.findIndex(y=>y.s===x.s)===i).slice(0,4);
 if(!hits.length)return {text:`Cette information figure principalement dans la rubrique **${LABELS[ps[0].section]||ps[0].section}**. Ouvrez la source ci-dessous pour consulter le document correspondant.`,pages:ps};
 return {text:hits.map(x=>`- ${x.s}`).join('\n'),pages:[...new Map(hits.map(x=>[x.p.page,x.p])).values()]}
}
async function submitChat(q){q=q.trim();if(!q)return;chatAdd(escapeHtml(q),'user');chatInput.value='';const wait=chatAdd('<span class="chat-thinking">Je vérifie dans le livret…</span>','bot');try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})}),data=await r.json();if(!r.ok)throw new Error(data.error||'Erreur');wait.remove();const d=chatAdd(renderAssistantText(data.answer||'Le livret ne précise pas ce point.'),'bot');attachSources(d,data.sources,'Dans le livret')}catch(err){wait.remove();const a=answerChat(q),d=chatAdd(renderAssistantText(a.text),'bot');const src=(a.pages||[]).map(p=>({page:p.page,section:p.section,title:titleFor(p)}));attachSources(d,src,'Dans le livret')}}
chatForm.onsubmit=e=>{e.preventDefault();submitChat(chatInput.value)};document.querySelectorAll('.chat-suggestions button').forEach(b=>b.onclick=()=>submitChat(b.textContent));

