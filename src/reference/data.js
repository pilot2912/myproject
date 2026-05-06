// ══════ Kashi Shakti — Static Data ═══════

window.KS_DATA = {
  // Today
  today: {
    greg: 'Wednesday, 22 April 2026',
    dayShort: 'Wed 22 Apr',
    tithi: 'Navami',
    tithiEnds: '11:42 PM',
    nakshatra: 'Punarvasu',
    nakshatraEnds: '9:17 PM',
    yoga: 'Siddha',
    yogaEnds: '6:50 PM',
    karana: 'Bava → Balava',
    karanaChange: '12:24 PM',
    vara: 'Budhavar',
    varaHi: 'बुधवार',
    paksha: 'Shukla Paksha',
    masa: 'Chaitra',
    samvat: 'Vikram Samvat 2083',
    sunrise: '5:53 AM',
    sunset: '6:42 PM',
    moonrise: '1:24 PM',
    moonset: '2:38 AM',
    abhijit: '11:53 AM – 12:44 PM',
    brahmaMuhurat: '4:21 – 5:07 AM',
    rahuKaal: '12:14 – 1:50 PM',
    yamagandam: '7:24 – 9:01 AM',
    gulika: '10:37 AM – 12:14 PM',
  },

  // Cities (affects sunrise / rahu kaal)
  cities: [
    { id: 'delhi',    name: 'New Delhi',  sunrise: '5:53 AM', sunset: '6:42 PM', rahu: '12:14 – 1:50 PM' },
    { id: 'mumbai',   name: 'Mumbai',     sunrise: '6:18 AM', sunset: '6:58 PM', rahu: '12:38 – 2:14 PM' },
    { id: 'varanasi', name: 'Varanasi',   sunrise: '5:28 AM', sunset: '6:19 PM', rahu: '11:53 – 1:28 PM' },
    { id: 'chennai',  name: 'Chennai',    sunrise: '5:54 AM', sunset: '6:24 PM', rahu: '12:09 – 1:39 PM' },
    { id: 'kolkata',  name: 'Kolkata',    sunrise: '5:02 AM', sunset: '5:54 PM', rahu: '11:28 – 1:02 PM' },
    { id: 'bengaluru',name: 'Bengaluru',  sunrise: '6:02 AM', sunset: '6:38 PM', rahu: '12:20 – 1:52 PM' },
  ],

  // April 2026 calendar — 30 days
  april2026: [
    { d: 1,  w: 3, tithi: 'Pratipada',   paksha: 'Shukla',  event: null },
    { d: 2,  w: 4, tithi: 'Dwitiya',     paksha: 'Shukla',  event: null },
    { d: 3,  w: 5, tithi: 'Tritiya',     paksha: 'Shukla',  event: { t: 'vrat', n: 'Pradosh Vrat' } },
    { d: 4,  w: 6, tithi: 'Chaturthi',   paksha: 'Shukla',  event: null },
    { d: 5,  w: 0, tithi: 'Panchami',    paksha: 'Shukla',  event: null },
    { d: 6,  w: 1, tithi: 'Sashti',      paksha: 'Shukla',  event: null },
    { d: 7,  w: 2, tithi: 'Saptami',     paksha: 'Shukla',  event: null },
    { d: 8,  w: 3, tithi: 'Ashtami',     paksha: 'Shukla',  event: { t: 'vrat', n: 'Durgashtami' } },
    { d: 9,  w: 4, tithi: 'Navami',      paksha: 'Shukla',  event: { t: 'fest', n: 'Ram Navami' } },
    { d: 10, w: 5, tithi: 'Dashami',     paksha: 'Shukla',  event: null },
    { d: 11, w: 6, tithi: 'Ekadashi',    paksha: 'Shukla',  event: { t: 'ekad', n: 'Papmochani Ekadashi' } },
    { d: 12, w: 0, tithi: 'Dwadashi',    paksha: 'Shukla',  event: null },
    { d: 13, w: 1, tithi: 'Trayodashi',  paksha: 'Shukla',  event: { t: 'fest', n: 'Baisakhi' } },
    { d: 14, w: 2, tithi: 'Chaturdashi', paksha: 'Shukla',  event: null },
    { d: 15, w: 3, tithi: 'Purnima',     paksha: 'Shukla',  event: { t: 'fest', n: 'Hanuman Jayanti' } },
    { d: 16, w: 4, tithi: 'Pratipada',   paksha: 'Krishna', event: null },
    { d: 17, w: 5, tithi: 'Dwitiya',     paksha: 'Krishna', event: null },
    { d: 18, w: 6, tithi: 'Tritiya',     paksha: 'Krishna', event: null },
    { d: 19, w: 0, tithi: 'Chaturthi',   paksha: 'Krishna', event: null },
    { d: 20, w: 1, tithi: 'Panchami',    paksha: 'Krishna', event: { t: 'vrat', n: 'Sankashti Chaturthi' } },
    { d: 21, w: 2, tithi: 'Sashti',      paksha: 'Krishna', event: null },
    { d: 22, w: 3, tithi: 'Saptami',     paksha: 'Krishna', event: null, today: true },
    { d: 23, w: 4, tithi: 'Ashtami',     paksha: 'Krishna', event: null },
    { d: 24, w: 5, tithi: 'Navami',      paksha: 'Krishna', event: null },
    { d: 25, w: 6, tithi: 'Dashami',     paksha: 'Krishna', event: { t: 'vrat', n: 'Masik Shivaratri' } },
    { d: 26, w: 0, tithi: 'Ekadashi',    paksha: 'Krishna', event: { t: 'ekad', n: 'Varuthini Ekadashi' } },
    { d: 27, w: 1, tithi: 'Amavasya',    paksha: 'Krishna', event: { t: 'vrat', n: 'Amavasya' } },
    { d: 28, w: 2, tithi: 'Pratipada',   paksha: 'Shukla',  event: null },
    { d: 29, w: 3, tithi: 'Dwitiya',     paksha: 'Shukla',  event: null },
    { d: 30, w: 4, tithi: 'Tritiya',     paksha: 'Shukla',  event: null },
  ],

  // Choghadiya (day)
  choghadiya: [
    { range: '5:53 – 7:29 AM',  name: 'Amrit', desc: 'All good works', rating: 3, k: 'amrit' },
    { range: '7:29 – 9:05 AM',  name: 'Kaal',  desc: 'Avoid new work', rating: 0, k: 'kaal' },
    { range: '9:05 – 10:41 AM', name: 'Shubh', desc: 'Auspicious',     rating: 3, k: 'shubh' },
    { range: '10:41 – 12:17',   name: 'Rog',   desc: 'Medical only',   rating: 1, k: 'rog' },
    { range: '12:17 – 1:53 PM', name: 'Udveg', desc: 'Avoid',          rating: 1, k: 'udveg' },
    { range: '1:53 – 3:29 PM',  name: 'Char',  desc: 'Travel',         rating: 2, k: 'char' },
    { range: '3:29 – 5:06 PM',  name: 'Labh',  desc: 'Business',       rating: 3, k: 'labh' },
    { range: '5:06 – 6:42 PM',  name: 'Amrit', desc: 'All good works', rating: 3, k: 'amrit' },
  ],

  // Upcoming festivals
  festivals: [
    { id: 'ram-navami',      d: 9,  m: 'Apr', name: 'Ram Navami',       tithi: 'Chaitra Shukla Navami', deity: 'Rama',    tag: 'National' },
    { id: 'baisakhi',        d: 13, m: 'Apr', name: 'Baisakhi',         tithi: 'Solar New Year',         deity: 'Harvest', tag: 'North India' },
    { id: 'hanuman-jayanti', d: 15, m: 'Apr', name: 'Hanuman Jayanti',  tithi: 'Chaitra Purnima',        deity: 'Hanuman', tag: 'National' },
    { id: 'akshaya-tritiya', d: 28, m: 'Apr', name: 'Akshaya Tritiya',  tithi: 'Vaishakha Shukla Tritiya', deity: 'Vishnu + Lakshmi', tag: 'National' },
    { id: 'buddha-purnima',  d: 15, m: 'May', name: 'Buddha Purnima',   tithi: 'Vaishakha Purnima',      deity: 'Buddha',  tag: 'National' },
    { id: 'ganga-dussehra',  d: 26, m: 'May', name: 'Ganga Dussehra',   tithi: 'Jyeshtha Shukla Dashami', deity: 'Ganga',  tag: 'North India' },
  ],

  // Vrats
  vrats: [
    { d: 22, m: 'Apr', name: 'Papmochani Ekadashi', tithi: 'Chaitra Krishna Ekadashi', deity: 'Vishnu', streak: 4 },
    { d: 25, m: 'Apr', name: 'Masik Shivaratri',    tithi: 'Chaitra Krishna Chaturdashi', deity: 'Shiva', streak: 2 },
    { d: 27, m: 'Apr', name: 'Amavasya',            tithi: 'Chaitra Amavasya',          deity: 'Pitru', streak: 0 },
    { d: 3,  m: 'May', name: 'Pradosh Vrat',        tithi: 'Vaishakha Shukla Trayodashi', deity: 'Shiva', streak: 2 },
  ],

  // Pujas
  pujas: [
    { id: 'ram-navami-puja', name: 'Ram Navami Maha Puja', temple: 'Ram Mandir, Ayodhya', price: 1100, deity: 'Rama',   tag: 'Special',  grad: ['#5A0F0F','#8B2810'], icon: '🏹', feats: ['Prasad','Certificate','Live Stream'] },
    { id: 'rudrabhishek',    name: 'Rudrabhishek Puja',    temple: 'Kashi Vishwanath',    price: 2100, deity: 'Shiva',  tag: 'Popular',  grad: ['#1A237E','#283593'], icon: '🔱', feats: ['Prasad','Certificate','Live Stream'] },
    { id: 'lakshmi-puja',    name: 'Shri Lakshmi Puja',    temple: 'Padmanabhaswamy',     price: 1501, deity: 'Lakshmi',tag: 'Trending', grad: ['#1B5E20','#2E7D32'], icon: '🌺', feats: ['Prasad','Certificate'] },
    { id: 'ganesh-abhishek', name: 'Ganesh Abhishek',      temple: 'Siddhivinayak, Mumbai', price: 1251, deity: 'Ganesha', tag: null,    grad: ['#311B92','#4527A0'], icon: '🐘', feats: ['Prasad','Certificate','Live Stream'] },
    { id: 'navchandi-yagna', name: 'Navchandi Yagna',      temple: 'Vaishno Devi, Katra', price: 5100, deity: 'Durga',  tag: 'Special',  grad: ['#7B1C1C','#A02828'], icon: '🌸', feats: ['Prasad','Certificate','Live Stream'] },
    { id: 'mahamrityunjay',  name: 'Mahamrityunjay Jaap',  temple: 'Mahakaleshwar, Ujjain', price: 3100, deity: 'Shiva', tag: null,      grad: ['#263238','#37474F'], icon: '🔱', feats: ['Prasad','Certificate'] },
    { id: 'satyanarayan',    name: 'Satyanarayan Katha',   temple: 'Your Home (Remote)',  price: 801,  deity: 'Vishnu', tag: null,      grad: ['#0D47A1','#1565C0'], icon: '🦚', feats: ['Prasad','Certificate'] },
    { id: 'durga-saptashati',name: 'Durga Saptashati Path',temple: 'Kamakhya, Guwahati',  price: 2501, deity: 'Durga',  tag: null,      grad: ['#880E4F','#AD1457'], icon: '🌺', feats: ['Prasad','Certificate','Live Stream'] },
  ],

  // Admin orders
  orders: [
    { id: '7721', puja: 'Rudrabhishek',     temple: 'Kashi Vishwanath',    status: 'confirmed', amount: 2040 },
    { id: '7720', puja: 'Ram Navami Puja',  temple: 'Ram Mandir',          status: 'progress',  amount: 1100 },
    { id: '7719', puja: 'Lakshmi Puja',     temple: 'Padmanabhaswamy',     status: 'completed', amount: 1501 },
    { id: '7718', puja: 'Ganesh Abhishek',  temple: 'Siddhivinayak',       status: 'confirmed', amount: 1251 },
    { id: '7717', puja: 'Navratri Yagna',   temple: 'Vaishno Devi',        status: 'completed', amount: 5100 },
    { id: '7716', puja: 'Mahamrityunjay',   temple: 'Mahakaleshwar',       status: 'progress',  amount: 3100 },
    { id: '7715', puja: 'Satyanarayan',     temple: 'Remote',              status: 'completed', amount: 801  },
  ],
};
