const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'mockData.js');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  // Légumes
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4197444/pexels-photo-4197444.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1540148426945-6cf22a6b2571?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4152200/pexels-photo-4152200.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1563252722-6434563a985d?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&w=800',

  // Fruits
  'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/3872406/pexels-photo-3872406.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/2611810/pexels-photo-2611810.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4963565/pexels-photo-4963565.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1601379760883-1bb497c558b0?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/2090902/pexels-photo-2090902.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&w=800',

  // Grains
  'https://images.unsplash.com/photo-1574323347407-2cb25973e9aa?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/6316514/pexels-photo-6316514.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg?auto=compress&w=800',

  // Livestock
  'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/3540310/pexels-photo-3540310.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1524024973431-2ad916746264?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4916214/pexels-photo-4916214.jpeg?auto=compress&w=800',

  // Dairy
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4110003/pexels-photo-4110003.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1550583724-b2692bc13508?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/5946624/pexels-photo-5946624.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4187779/pexels-photo-4187779.jpeg?auto=compress&w=800',

  // Equipment
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1585227807090-fdeecbb7e3ad?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/7728867/pexels-photo-7728867.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1586019327001-06a866e5d36d?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1682397/pexels-photo-1682397.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1530836176759-855c6e035a93?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/3163914/pexels-photo-3163914.jpeg?auto=compress&w=800',

  // Fertilizers
  'https://images.unsplash.com/photo-1627993425440-629a4a7ce3b6?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/5231135/pexels-photo-5231135.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4505166/pexels-photo-4505166.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1586771107445-b3e7eb9c1e75?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/1257401/pexels-photo-1257401.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1611735341450-0d9f5a73c18b?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4505164/pexels-photo-4505164.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1563723261736-fca03e8ab590?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4505459/pexels-photo-4505459.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1592491248991-535c9a992f79?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4149023/pexels-photo-4149023.jpeg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4505461/pexels-photo-4505461.jpeg?auto=compress&w=800',

  // Olives
  'https://images.unsplash.com/photo-1474979266404-7eaacdc948b6?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&w=800',
  'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=800&q=80': 'https://images.pexels.com/photos/4109907/pexels-photo-4109907.jpeg?auto=compress&w=800'
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(key, value);
}

// Special cases
let start1 = content.indexOf("title: 'شعير علفي");
if (start1 !== -1) {
  let end1 = content.indexOf("]", start1);
  if (end1 !== -1) {
      let chunk1 = content.substring(start1, end1);
      let newChunk1 = chunk1.replace("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80", "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&w=800");
      content = content.substring(0, start1) + newChunk1 + content.substring(end1);
  }
}

let start2 = content.indexOf("title: 'مبيد فطري");
if (start2 !== -1) {
  let end2 = content.indexOf("]", start2);
  if (end2 !== -1) {
      let chunk2 = content.substring(start2, end2);
      let newChunk2 = chunk2.replace("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80", "https://images.pexels.com/photos/4149020/pexels-photo-4149020.jpeg?auto=compress&w=800");
      content = content.substring(0, start2) + newChunk2 + content.substring(end2);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Images replaced successfully!");
