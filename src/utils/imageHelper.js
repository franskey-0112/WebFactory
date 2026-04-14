/**
 * 图片辅助工具
 * 提供产品图片占位符和在线图片服务
 */

// 基于产品类别的 Unsplash 关键词映射
const categoryKeywords = {
  'electronics': 'technology,gadget',
  'smartphones': 'smartphone,mobile',
  'laptops': 'laptop,computer',
  'tablets': 'tablet,ipad',
  'headphones': 'headphones,audio',
  'cameras': 'camera,photography',
  'gaming': 'gaming,controller',
  'books': 'book,reading',
  'fiction': 'book,novel',
  'non-fiction': 'book,education',
  'home-garden': 'home,interior',
  'furniture': 'furniture,interior',
  'kitchen': 'kitchen,cooking',
  'tools': 'tools,hardware',
  'garden': 'garden,plants',
  'clothing': 'fashion,clothing',
  'mens-clothing': 'menswear,fashion',
  'womens-clothing': 'womenswear,dress',
  'shoes': 'shoes,footwear',
  'jewelry': 'jewelry,accessories',
  'sports': 'sports,fitness',
  'fitness': 'gym,workout',
  'outdoor-recreation': 'outdoor,hiking'
};

/**
 * 生成 Lorem Picsum 图片 URL（推荐 - 快速稳定）
 * @param {string} seed - 用于生成一致图片的种子（通常是产品ID）
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 */
export const getPicsumImage = (seed, width = 400, height = 400) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

/**
 * 生成 Unsplash Source 图片 URL（高质量真实照片）
 * @param {string} keywords - 搜索关键词
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 */
export const getUnsplashImage = (keywords, width = 400, height = 400) => {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(keywords)}`;
};

/**
 * 生成 Lorem Flickr 图片 URL（分类图片）
 * @param {string} keywords - 搜索关键词
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 */
export const getLoremFlickrImage = (keywords, width = 400, height = 400) => {
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(keywords)}`;
};

/**
 * 生成占位符图片 URL
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @param {string} text - 显示文本
 * @param {string} bgColor - 背景颜色
 * @param {string} textColor - 文字颜色
 */
export const getPlaceholderImage = (width = 400, height = 400, text = 'Product', bgColor = 'f5f5f5', textColor = '999') => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

/**
 * 根据产品分类获取适合的图片 URL
 * @param {object} product - 产品对象
 * @param {number} index - 图片索引
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 */
export const getProductImage = (product, index = 0, width = 400, height = 400) => {
  const category = product.subcategory || product.category;
  const seed = `${product.id}-${index}`;
  
  // 使用 Lorem Picsum（快速稳定）
  return getPicsumImage(seed, width, height);
};

/**
 * 获取产品图片数组
 * @param {object} product - 产品对象
 * @param {number} count - 图片数量
 */
export const getProductImages = (product, count = 3) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push(getProductImage(product, i));
  }
  return images;
};

/**
 * 图片加载失败时的回退处理
 * @param {Event} event - 错误事件
 * @param {string} fallbackUrl - 回退图片URL
 */
export const handleImageError = (event, fallbackUrl = null) => {
  const defaultFallback = 'https://via.placeholder.com/400x400/f5f5f5/999?text=No+Image';
  event.target.src = fallbackUrl || defaultFallback;
  event.target.onerror = null; // 防止无限循环
};

// 预设的产品图片集合（来自 Unsplash）
export const productImageUrls = {
  electronics: {
    smartphones: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop'
    ],
    laptops: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400&h=400&fit=crop'
    ],
    headphones: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    ]
  },
  kitchen: {
    appliances: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop'
    ],
    cookware: [
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584990347449-a7e56b8bb5d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&h=400&fit=crop'
    ],
    utensils: [
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&h=400&fit=crop'
    ]
  },
  home: {
    furniture: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop'
    ],
    decor: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556909114-1e6c4c753f6f?w=400&h=400&fit=crop'
    ]
  }
};

export default {
  getPicsumImage,
  getUnsplashImage,
  getLoremFlickrImage,
  getPlaceholderImage,
  getProductImage,
  getProductImages,
  handleImageError,
  productImageUrls
};
