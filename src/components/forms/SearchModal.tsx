'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  href?: string;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchItems: SearchItem[] = [
  // Tours
  {
    id: 'tour-1',
    title: 'Classic Big Five Safari',
    category: 'tours',
    description: 'Serengeti National Park - 5 days',
    href: '#',
  },
  {
    id: 'tour-2',
    title: 'Great Migration Safari',
    category: 'tours',
    description: 'Serengeti to Maasai Mara - 7 days',
    href: '#',
  },
  {
    id: 'tour-3',
    title: 'Gorilla Trekking Adventure',
    category: 'tours',
    description: 'Bwindi Forest - 6 days',
    href: '#',
  },
  {
    id: 'tour-4',
    title: 'Zanzibar Beach Escape',
    category: 'tours',
    description: 'Spice Island - 4 days',
    href: '#',
  },
  {
    id: 'tour-5',
    title: 'Kilimanjaro Summit Climb',
    category: 'tours',
    description: 'Tanzania - 8 days',
    href: '#',
  },

  // Destinations
  {
    id: 'dest-1',
    title: 'Serengeti National Park',
    category: 'destinations',
    description: 'Tanzania - World famous wildlife sanctuary',
    href: '#',
  },
  {
    id: 'dest-2',
    title: 'Maasai Mara',
    category: 'destinations',
    description: 'Kenya - Prime wildlife viewing',
    href: '#',
  },
  {
    id: 'dest-3',
    title: 'Bwindi Impenetrable Forest',
    category: 'destinations',
    description: 'Uganda - Mountain gorilla habitat',
    href: '#',
  },
  {
    id: 'dest-4',
    title: 'Mount Kilimanjaro',
    category: 'destinations',
    description: 'Tanzania - Africa\'s highest peak',
    href: '#',
  },
  {
    id: 'dest-5',
    title: 'Kruger National Park',
    category: 'destinations',
    description: 'South Africa - Exceptional Big Five viewing',
    href: '#',
  },
  {
    id: 'dest-6',
    title: 'Zanzibar',
    category: 'destinations',
    description: 'Tanzania - Beautiful spice island beaches',
    href: '#',
  },

  // Blog Posts
  {
    id: 'blog-1',
    title: 'Best Time to Visit the Serengeti',
    category: 'blog',
    description: 'A complete guide to planning your safari',
    href: '#',
  },
  {
    id: 'blog-2',
    title: 'Photography Tips for Safari',
    category: 'blog',
    description: 'Capture stunning wildlife moments',
    href: '#',
  },
  {
    id: 'blog-3',
    title: 'What to Pack for an African Safari',
    category: 'blog',
    description: 'Essential items for your adventure',
    href: '#',
  },
  {
    id: 'blog-4',
    title: 'Sustainable Tourism in Africa',
    category: 'blog',
    description: 'Travel responsibly and protect wildlife',
    href: '#',
  },
  {
    id: 'blog-5',
    title: 'Gorilla Trekking: A Once-in-a-Lifetime Experience',
    category: 'blog',
    description: 'Everything you need to know',
    href: '#',
  },
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        onOpenChange(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  const handleSelect = (item: SearchItem) => {
    console.log('Selected:', item);
    // TODO: Navigate to item.href or handle selection
    setIsOpen(false);
    onOpenChange(false);
  };

  const tours = searchItems.filter((item) => item.category === 'tours');
  const destinations = searchItems.filter((item) => item.category === 'destinations');
  const blogs = searchItems.filter((item) => item.category === 'blog');

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(newOpen) => {
        setIsOpen(newOpen);
        onOpenChange(newOpen);
      }}
    >
      <CommandInput
        placeholder="Search tours, destinations, articles... (Cmd+K)"
        className="border-gray-300"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {tours.length > 0 && (
          <CommandGroup heading="Tours" className="overflow-hidden">
            {tours.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <Search className="mr-2 h-4 w-4 text-[#3d3f97]" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500">{item.description}</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {destinations.length > 0 && (
          <CommandGroup heading="Destinations" className="overflow-hidden">
            {destinations.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <Search className="mr-2 h-4 w-4 text-[#4eadb3]" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500">{item.description}</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {blogs.length > 0 && (
          <CommandGroup heading="Blog Posts" className="overflow-hidden">
            {blogs.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <Search className="mr-2 h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500">{item.description}</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>

      <div className="border-t border-gray-200 p-2 text-xs text-gray-500">
        <div className="flex items-center justify-between px-2 py-1">
          <span>Press Cmd+K to open search anytime</span>
        </div>
      </div>
    </CommandDialog>
  );
}
