import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-booking-light-bg mt-10 pt-10 pb-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-700 mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">About FlightBooker</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">How It Works</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Sustainability</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Press Center</Link></li>
              <li><Link href="/careerlink/jobs" className="text-sm text-gray-600 hover:text-booking-blue">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/amazon/customer-service" className="text-sm text-gray-600 hover:text-booking-blue">Customer Service</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Partner Support</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Safe Travel</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Booking Information</Link></li>
              <li><Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><Link href="/staybnb/destinations" className="text-sm text-gray-600 hover:text-booking-blue">Countries</Link></li>
              <li><Link href="/staybnb/destinations" className="text-sm text-gray-600 hover:text-booking-blue">Regions</Link></li>
              <li><Link href="/staybnb/destinations" className="text-sm text-gray-600 hover:text-booking-blue">Cities</Link></li>
              <li><Link href="/flights/search" className="text-sm text-gray-600 hover:text-booking-blue">Airports</Link></li>
              <li><Link href="/flights/search" className="text-sm text-gray-600 hover:text-booking-blue">Airlines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link href="/staybnb/account" className="text-sm text-gray-600 hover:text-booking-blue">User Account</Link></li>
              <li><Link href="/hotels" className="text-sm text-gray-600 hover:text-booking-blue">Membership &amp; Deals</Link></li>
              <li><Link href="/companycheck/reviews" className="text-sm text-gray-600 hover:text-booking-blue">Travel Reviews</Link></li>
              <li><Link href="/staybnb/trips" className="text-sm text-gray-600 hover:text-booking-blue">Manage Bookings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2023 FlightBooker - Inspired by Booking.com - Experimental project, not for commercial use
            </p>
            <div className="flex space-x-6">
              <Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Privacy Policy</Link>
              <Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Terms of Service</Link>
              <Link href="/flights" className="text-sm text-gray-600 hover:text-booking-blue">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
