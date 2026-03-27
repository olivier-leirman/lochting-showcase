import type { WebshopProduct } from '../types';
import { MEDIPIM_PRODUCTS } from '../medipim/products';

// Transform a subset of Medipim products into webshop products for Lochting
function toWebshopProduct(
  medipimId: string,
  overrides: Partial<Pick<WebshopProduct, 'isFeatured' | 'isActive' | 'tags'>> & {
    shortDescription: string;
  }
): WebshopProduct {
  const source = MEDIPIM_PRODUCTS.find((p) => p.id === medipimId);
  if (!source) throw new Error(`Product ${medipimId} not found in Medipim data`);

  return {
    ...source,
    slug: source.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/g, ''),
    isActive: overrides.isActive ?? true,
    isFeatured: overrides.isFeatured ?? false,
    shortDescription: overrides.shortDescription,
    tags: overrides.tags ?? [],
  };
}

export const LOCHTING_PRODUCTS: WebshopProduct[] = [
  toWebshopProduct('med-001', {
    isFeatured: true,
    shortDescription: 'Pijnstillend en koortswerend. 1000mg paracetamol.',
    tags: ['bestseller', 'pijnstilling', 'koorts'],
  }),
  toWebshopProduct('med-002', {
    shortDescription: 'Ontstekingsremmend en pijnstillend. 400mg ibuprofen.',
    tags: ['pijnstilling', 'ontsteking'],
  }),
  toWebshopProduct('med-003', {
    isFeatured: true,
    shortDescription: 'Gel tegen spier- en gewrichtspijn. Lokale toepassing.',
    tags: ['pijnstilling', 'gel', 'spieren'],
  }),
  toWebshopProduct('med-004', {
    shortDescription: 'Pijnstillend en koortswerend. 500mg paracetamol.',
    tags: ['pijnstilling', 'koorts'],
  }),
  toWebshopProduct('med-006', {
    shortDescription: 'Snelwerkende ibuprofen tegen diverse pijnklachten.',
    tags: ['pijnstilling', 'snelwerkend'],
  }),
  toWebshopProduct('med-008', {
    isFeatured: true,
    shortDescription: 'Beschermt tegen brandend maagzuur en reflux.',
    tags: ['maagzuur', 'reflux', 'bestseller'],
  }),
  toWebshopProduct('med-010', {
    shortDescription: 'Kauwbare tabletten voor snelle verlichting van maagzuur.',
    tags: ['maagzuur', 'snelwerkend'],
  }),
  toWebshopProduct('med-012', {
    shortDescription: 'Slijmoplossend bij productieve hoest.',
    tags: ['hoest', 'luchtwegen'],
  }),
  toWebshopProduct('med-014', {
    shortDescription: 'Verzachtende keelpastilles met honing en citroen.',
    tags: ['keelpijn', 'pastilles'],
  }),
  toWebshopProduct('med-016', {
    isFeatured: true,
    shortDescription: 'Ondersteunt botten en immuunsysteem. 1000 IU per tablet.',
    tags: ['vitaminen', 'immuunsysteem', 'bestseller'],
  }),
  toWebshopProduct('med-017', {
    shortDescription: 'Tegen vermoeidheid en spierkrampen. 450mg magnesium.',
    tags: ['mineralen', 'energie'],
  }),
  toWebshopProduct('med-018', {
    shortDescription: 'Duo-formule voor sterke weerstand.',
    tags: ['immuunsysteem', 'vitaminen'],
  }),
  toWebshopProduct('med-019', {
    shortDescription: 'Omega 3 vetzuren voor hart en hersenen.',
    tags: ['vetzuren', 'hart', 'hersenen'],
  }),
  toWebshopProduct('med-020', {
    isFeatured: true,
    shortDescription: '10 miljard goede bacteriën voor je darmflora.',
    tags: ['probiotica', 'darmgezondheid', 'nieuw'],
  }),
  toWebshopProduct('med-022', {
    shortDescription: 'Bevordert natuurlijk huidherstel. Ook voor baby.',
    tags: ['huid', 'baby', 'verzorging'],
  }),
];
