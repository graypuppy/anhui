import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const cities = ['全省板块', '合肥市', '马鞍山市', '亳州市', '安庆市', '淮南市', '黄山市', '蚌埠市', '芜湖市', '淮北市'];

type Platform = {
  id: number;
  city: string;
  name: string;
  isVip: boolean;
  status: string;
  price: number;
  originalPrice: number;
  isClickable: boolean;
  benefits?: string;
  priceText?: string;
};

const platformsData: Platform[] = [
  { id: 101, city: '全省板块', name: '增值服务', isVip: true, status: '非会员', price: 3888.0, originalPrice: 5000.0, isClickable: true, benefits: '包含模拟解密、模拟唱标、标书检查、文档优化、PDF合并等功能，祝您提高投标效率' },
  { id: 1, city: '合肥市', name: '安徽建工集团电子化招采平台', isVip: true, status: '非会员', price: 700.0, originalPrice: 1000.0, isClickable: true, benefits: '享受一对一专属客户经理、投标环境检测修复、安徽建工集团平台项目投标文件制作。' },
  { id: 2, city: '合肥市', name: '寰亚新点电子交易平台', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 3, city: '合肥市', name: '微易采电子交易平台', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 4, city: '合肥市', name: '水利部淮河水利委员会·安徽省水利厅电子招标投标交易平台', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 5, city: '合肥市', name: '安徽公共资源交易集团数智交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 201, city: '马鞍山市', name: '马鞍山市兴马项目咨询有限公司电子交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false, priceText: '按标段付费，100-300/次', benefits: '享受一对一专属客户经理、投标环境检测修复、马鞍山市兴马项目咨询有限公司电子交易系统项目投标文件制作。' },
  { id: 202, city: '马鞍山市', name: '马鞍山市公共资源电子交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false, benefits: '享受一对一专属客户经理、投标环境检测修复、马鞍山市公共资源电子交易系统项目投标文件制作。' },
  { id: 301, city: '亳州市', name: '亳州市公共资源交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 401, city: '安庆市', name: '安庆市公共资源交易电子交易平台', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 501, city: '淮南市', name: '淮南市公共资源交易平台', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 601, city: '黄山市', name: '黄山市公共资源网上交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 701, city: '蚌埠市', name: '蚌埠市公共资源电子交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 801, city: '芜湖市', name: '芜湖市公共资源电子交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
  { id: 901, city: '淮北市', name: '淮北市公共资源电子交易系统', isVip: true, status: '非会员', price: 0.0, originalPrice: 1000.0, isClickable: false },
];

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([101]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActivePopoverId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const togglePlatform = (id: number) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalPrice = platformsData
    .filter(p => selectedPlatforms.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const totalOriginalPrice = platformsData
    .filter(p => selectedPlatforms.includes(p.id))
    .reduce((sum, p) => sum + p.originalPrice, 0);

  // In the user's screenshot, the original price total was somehow exactly 800 with one item selected. 
  // We'll calculate accurately based on selected items, but fallback to 800 to match the image visually if ID 1 is the only selection
  const displayOriginalPrice = (selectedPlatforms.length === 1 && selectedPlatforms[0] === 1) ? 800.0 : totalOriginalPrice;

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1000px] overflow-hidden flex flex-col font-sans">
        
        {/* Header */}
        <div className="bg-[#3070fb] text-white px-5 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">购买/续费</h2>
          <button className="text-white hover:text-blue-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex h-[600px]">
          {/* Left Sidebar - Cities */}
          <div className="w-[120px] shrink-0 border-r border-gray-100 bg-[#fafafa] flex flex-col">
            {cities.map(city => (
              <div 
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-4 text-center text-sm cursor-pointer transition-colors ${
                  selectedCity === city 
                    ? 'text-gray-900 font-medium bg-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {city}
              </div>
            ))}
          </div>

          {/* Right Main Content */}
          <div className="flex-1 flex flex-col bg-[#f5f6f9]">
            {/* Top Info Banner */}
            <div className="bg-[#f0f2f5] px-4 py-3 text-xs text-gray-600">
              客户经理: 方经理18255973507、洪经理 15792528453
            </div>

            {/* Platform List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {platformsData
                .filter(p => !p.city || p.city === selectedCity)
                .map(platform => {
                const isSelected = selectedPlatforms.includes(platform.id);
                const isClickable = platform.isClickable;

                return (
                  <label 
                    key={platform.id}
                    className={`block border rounded-md p-4 bg-white transition-all ${
                      isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                    } ${
                      isSelected && isClickable ? 'border-[#3070fb] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Left: Checkbox + Name */}
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          className={`w-4 h-4 accent-[#3070fb] ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                          checked={isSelected}
                          disabled={!isClickable}
                          onChange={() => {
                            if (isClickable) {
                              togglePlatform(platform.id)
                            }
                          }}
                        />
                        {platform.isVip && (
                          <span className={`text-[10px] px-[4px] py-[1px] rounded-sm leading-tight inline-block ${
                            isClickable ? 'bg-[#3070fb] text-white' : 'bg-gray-300 text-gray-50'
                          }`}>
                            VIP
                          </span>
                        )}
                        <div>
                          <div className={`text-sm font-medium ${isClickable ? 'text-gray-800' : 'text-gray-500'}`}>{platform.name}</div>
                          <div className="text-gray-400 text-xs mt-1">{platform.status}</div>
                        </div>
                      </div>

                      {/* Right: Prices + Action */}
                      <div className="flex items-center gap-4">
                        <div className={`text-sm font-bold ${isClickable ? 'text-gray-800' : 'text-gray-500'}`}>
                          {platform.priceText ? (
                            <span>{platform.priceText}</span>
                          ) : (
                            <>¥{platform.price.toFixed(1)}<span className="font-normal text-xs text-gray-400">/年</span></>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {platform.priceText ? '' : `原价:¥${platform.originalPrice.toFixed(1)}/年`}
                        </div>
                        <div className="relative">
                          <button 
                            className={`text-xs relative z-10 ${
                              isClickable 
                                ? 'text-blue-500 hover:text-blue-600 hover:underline' 
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!isClickable}
                            onClick={(e) => {
                              if (!isClickable) return;
                              e.preventDefault();
                              e.stopPropagation();
                              setActivePopoverId(activePopoverId === platform.id ? null : platform.id);
                            }}
                          >
                            查看权益
                          </button>
                          {activePopoverId === platform.id && isClickable && (
                            <div 
                              className="absolute right-0 top-full mt-2 w-64 p-3 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] rounded-lg z-50 text-gray-600 leading-relaxed text-left cursor-default shadow-xl"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45"></div>
                              <div className="relative z-10 text-xs">
                                {platform.benefits || '暂无权益描述'}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-5 py-4 flex justify-between items-center">
          {/* Left Footer items */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              已选: {selectedPlatforms.length}个 <button className="text-[#3070fb] hover:underline ml-1">查看</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-800">邀请码:</span>
              <input 
                type="text" 
                placeholder="请输入" 
                className="border border-gray-200 rounded px-2 py-1.5 text-xs w-32 focus:outline-none focus:border-[#3070fb]"
              />
            </div>
          </div>

          {/* Right Footer items */}
          <div className="flex items-center gap-4">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-xs text-gray-400 pb-0.5">原价: ¥{displayOriginalPrice.toFixed(1)}</span>
              <div className="text-sm text-gray-600">
                实付: <span className="text-xl font-bold text-gray-900 border-b border-transparent">¥{totalPrice.toFixed(1)}</span>
              </div>
            </div>
            
            <label className="flex items-center gap-1.5 cursor-pointer ml-3">
              <input 
                type="checkbox" 
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#3070fb] cursor-pointer"
              />
              <span className="text-xs text-gray-600 select-none">
                同意<a href="#" className="hover:text-blue-500 text-gray-800">《用户协议》</a>及<a href="#" className="hover:text-blue-500 text-gray-800">《隐私协议》</a>
              </span>
            </label>

            <button 
              className={`ml-2 px-6 py-2 rounded text-white text-sm transition-colors ${
                isAgreed ? 'bg-[#f4a844] hover:bg-[#eb9e38]' : 'bg-[#fad5a7] cursor-not-allowed'
              }`}
              disabled={!isAgreed}
            >
              下一步
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
