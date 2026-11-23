const unsplash = (id, width, height) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

const CATEGORY_PHOTOS = {
  beauty: [
    "photo-1596462502278-27bfdc403348",
    "photo-1522335789203-aabd1fc54bc9",
    "photo-1487412947147-5cebf100ffc2",
    "photo-1512496015851-a90fb38ba796",
  ],
  fragrances: [
    "photo-1541643600914-78b084683601",
    "photo-1594035910387-fea47794261f",
    "photo-1615634260167-c8cdede054de",
    "photo-1592945403244-b3fbafd7f539",
  ],
  furniture: [
    "photo-1555041469-a586c61ea9bc",
    "photo-1493663284031-b7e3aefcae8e",
    "photo-1567016432779-094069958ea5",
    "photo-1505693416388-ac5ce068fe85",
  ],
  groceries: [
    "photo-1542838132-92c53300491e",
    "photo-1610832958506-aa56368176cf",
    "photo-1606787366850-de6330128bfc",
    "photo-1512621776951-a57141f2eefd",
  ],
  "home-decoration": [
    "photo-1519710164239-da123dc03ef4",
    "photo-1616046229478-9901c5536a45",
    "photo-1618221195710-dd6b41faaea6",
    "photo-1586023492125-27b2c045efd7",
  ],
  "kitchen-accessories": [
    "photo-1556911220-e15b29be8c8f",
    "photo-1556909114-f6e7ad7d3136",
    "photo-1556910103-1c02745aae4d",
    "photo-1565183997392-2f6f122e5912",
  ],
  laptops: [
    "photo-1496181133206-80ce9b88a853",
    "photo-1517336714731-489689fd1ca8",
    "photo-1484788984921-03950022c9ef",
    "photo-1498050108023-c5249f4df085",
  ],
  "mens-shirts": [
    "photo-1602810318383-e386cc2a3ccf",
    "photo-1596755094514-f87e34085b2c",
    "photo-1620012253295-c15cc3e65df4",
    "photo-1617137968427-85924c800a22",
  ],
  "mens-shoes": [
    "photo-1549298916-b41d501d3772",
    "photo-1460353581641-37baddab0fa2",
    "photo-1606107557195-0e29a4b5b4aa",
    "photo-1542291026-7eec264c27ff",
  ],
  "mens-watches": [
    "photo-1524805444758-089113d48a6d",
    "photo-1524592094714-0f0654e20314",
    "photo-1434056886845-dac89ffe9b56",
    "photo-1523170335258-f5ed11844a49",
  ],
  "mobile-accessories": [
    "photo-1505740420928-5e560c06d30e",
    "photo-1583394838336-acd977736f90",
    "photo-1601784551446-20c9e07cdbdb",
    "photo-1572569511254-d8f925fe2cbb",
  ],
  motorcycle: [
    "photo-1558981403-c5f9899a28bc",
    "photo-1558981806-ec527fa84c39",
    "photo-1449426468159-d96dbf08f19f",
    "photo-1568772585407-9361f9bf3a87",
  ],
  "skin-care": [
    "photo-1556228720-195a672e8a03",
    "photo-1571781926291-c477ebfd024b",
    "photo-1612817288484-6f916006741a",
    "photo-1620916566398-39f1143ab7be",
  ],
  smartphones: [
    "photo-1511707171634-5f897ff02aa9",
    "photo-1592899677977-9c10ca588bbd",
    "photo-1510557880182-3d4d3cba35a5",
    "photo-1580910051074-3eb694886505",
  ],
  "sports-accessories": [
    "photo-1517836357463-d25dfeac3438",
    "photo-1571019614242-c5c5dee9f50b",
    "photo-1518611012118-696072aa579a",
    "photo-1599058917212-d750089bc07e",
  ],
  sunglasses: [
    "photo-1511499767150-a48a237f0083",
    "photo-1473496169904-658ba7c44d8a",
    "photo-1572635196237-14b3f281503f",
    "photo-1508296695146-257a814070b4",
  ],
  tablets: [
    "photo-1544244015-0df4b3ffc6b0",
    "photo-1561154464-82e9adf32764",
    "photo-1585790050230-5dd28404ccb9",
    "photo-1542751110-97427bbecf20",
  ],
  tops: [
    "photo-1434389677669-e08b4cac3105",
    "photo-1485968579580-b6d095142e6e",
    "photo-1521572163474-6864f9cf17ab",
    "photo-1562157873-818bc0726f68",
  ],
  vehicle: [
    "photo-1494976388531-d1058494cdd8",
    "photo-1503376780353-7e6692767b70",
    "photo-1492144534655-ae79c964c9d7",
    "photo-1542362567-b07e54358753",
  ],
  "womens-bags": [
    "photo-1548036328-c9fa89d128fa",
    "photo-1590874103328-eac38a683ce7",
    "photo-1584917865442-de89df76afd3",
    "photo-1594633312681-425c7b97ccd1",
  ],
  "womens-dresses": [
    "photo-1496747611176-843222e1e57c",
    "photo-1515372039744-b8f02a3ae446",
    "photo-1539008835657-9e8e9680c956",
    "photo-1566174053879-31528523f8ae",
  ],
  "womens-jewellery": [
    "photo-1515562141207-7a88fb7ce338",
    "photo-1535632066927-ab7c9ab60908",
    "photo-1611591437281-460bfbe1220a",
    "photo-1601121141461-9d6647bca1ed",
  ],
  "womens-shoes": [
    "photo-1543163521-1bf539c55dd2",
    "photo-1560769629-975ec94e6a86",
    "photo-1535043934128-cf0b28d52f95",
    "photo-1515347619252-60a4bf4fff4f",
  ],
  "womens-watches": [
    "photo-1522312346375-d1a52e2b99b3",
    "photo-1524805444758-089113d48a6d",
    "photo-1508685096489-7aacd43bd3b1",
    "photo-1612817159949-195b6eb9e31a",
  ],
};

const DEFAULT_PHOTOS = [
  "photo-1441986300917-64674bd600d8",
  "photo-1472851294608-062f824d29cc",
  "photo-1483985988355-763728e1935b",
];

const poolFor = (slug) => CATEGORY_PHOTOS[slug] || DEFAULT_PHOTOS;

export const coverForCategory = (slug) => unsplash(poolFor(slug)[0], 640, 640);

export const photosForProduct = (product) => {
  const slug =
    typeof product.category === "string" ? product.category : product.category?.id;
  const pool = poolFor(slug);
  const start = Math.abs(Number(product.id) || 0) % pool.length;

  return [0, 1, 2].map((offset) =>
    unsplash(pool[(start + offset) % pool.length], 1400, 1050)
  );
};
