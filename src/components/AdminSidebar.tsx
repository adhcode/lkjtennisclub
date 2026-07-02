'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package, 
  FolderTree,
  Tag,
  Calendar,
  FileText,
  LogOut,
  Home,
  ChevronRight
} from 'lucide-react';
import { Raleway } from 'next/font/google';
import Image from 'next/image';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Members', href: '/admin/members', icon: Users },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Brands', href: '/admin/brands', icon: Tag },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Product Requests', href: '/admin/product-requests', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-[#911b1e] text-[#fcf7dc] flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#fcf7dc]/20">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="LKJ Tennis Club"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <h1 className="font-agrandir text-lg">LKJ TENNIS</h1>
            <p className={`text-[#fcf7dc]/70 text-xs ${raleway.className}`}>Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-[#fcf7dc]/20">
        <p className={`text-sm ${raleway.className}`}>
          Signed in as
        </p>
        <p className={`text-[#fcf7dc] font-semibold ${raleway.className}`}>
          {(session?.user as any)?.name || session?.user?.email}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${raleway.className}
                ${active 
                  ? 'bg-[#fcf7dc] text-[#911b1e] font-semibold' 
                  : 'text-[#fcf7dc] hover:bg-[#fcf7dc]/10'
                }`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.name}</span>
              {active && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-[#fcf7dc]/20 space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[#fcf7dc] hover:bg-[#fcf7dc]/10 transition-all ${raleway.className}`}
        >
          <Home size={20} />
          <span>View Site</span>
        </Link>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-[#fcf7dc] hover:bg-red-500/20 transition-all ${raleway.className}`}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
