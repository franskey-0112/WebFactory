import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlane, FaHotel, FaCar, FaUser, FaBars, FaTimes, FaShoppingCart, FaHome } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  // 根据当前路径确定网站类型
  const getSiteInfo = () => {
    const pathname = router.pathname;
    
    if (pathname.startsWith('/hotels')) {
      return {
        title: 'HotelBooker',
        logo: <FaHotel className="mr-2" />,
        primaryColor: 'bg-blue-700',
        navigation: [
          { href: '/hotels', icon: <FaHome className="mr-1" />, label: 'Home' },
          { href: '/hotels/search', icon: <FaHotel className="mr-1" />, label: 'Search Hotels' },
          { href: '/carrental', icon: <FaCar className="mr-1" />, label: 'Car Rental' },
          { href: '/flights', icon: <FaPlane className="mr-1" />, label: 'Flights' }
        ]
      };
    } else if (pathname.startsWith('/amazon')) {
      return {
        title: 'Amazon',
        logo: <FaShoppingCart className="mr-2" />,
        primaryColor: 'bg-orange-600',
        navigation: [
          { href: '/amazon', icon: <FaHome className="mr-1" />, label: 'Home' },
          { href: '/amazon/search', icon: <FaShoppingCart className="mr-1" />, label: 'Shop' },
          { href: '/amazon/cart', icon: <FaShoppingCart className="mr-1" />, label: 'Cart' },
          { href: '/hotels', icon: <FaHotel className="mr-1" />, label: 'Hotels' }
        ]
      };
    } else {
      return {
        title: 'FlightBooker',
        logo: <FaPlane className="mr-2" />,
        primaryColor: 'bg-booking-dark-blue',
        navigation: [
          { href: '/flights', icon: <FaPlane className="mr-1" />, label: 'Flights' },
          { href: '/hotels', icon: <FaHotel className="mr-1" />, label: 'Hotels' },
          { href: '/amazon', icon: <FaShoppingCart className="mr-1" />, label: 'Amazon' },
          { href: '/carrental', icon: <FaCar className="mr-1" />, label: 'Car Rental' }
        ]
      };
    }
  };

  const siteInfo = getSiteInfo();

  return (
    <header className={`${siteInfo.primaryColor} text-white shadow-lg`}>
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href={router.pathname.startsWith('/hotels') ? '/hotels' : router.pathname.startsWith('/amazon') ? '/amazon' : '/'} 
            className="text-2xl font-bold flex items-center no-underline text-white hover:text-yellow-400 transition-colors"
          >
            {siteInfo.logo}
            <span>{siteInfo.title}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {siteInfo.navigation.map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="flex items-center text-white no-underline hover:text-yellow-400 transition-colors duration-200 px-3 py-2 rounded"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Area */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/amazon" className="text-white no-underline hover:text-yellow-400 transition-colors">
              <span>USD</span>
            </Link>
            <Link href="/amazon/customer-service" className="text-white no-underline hover:text-yellow-400 transition-colors">
              Help
            </Link>
            <div className="flex items-center text-white">
              <FaUser className="mr-2" />
              <span>Sign In</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-white/20 pt-4">
            <nav className="flex flex-col space-y-2">
              {siteInfo.navigation.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="flex items-center text-white no-underline hover:text-yellow-400 transition-colors duration-200 px-3 py-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="border-t border-white/20 pt-2 mt-2">
                <Link href="/amazon/customer-service" className="block text-white no-underline hover:text-yellow-400 px-3 py-2">
                  Help
                </Link>
                <div className="flex items-center text-white px-3 py-2">
                  <FaUser className="mr-2" />
                  <span>Sign In</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 