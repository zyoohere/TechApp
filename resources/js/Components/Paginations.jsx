import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex justify-center mt-10 flex-wrap gap-2">
            {links.map((link, index) => {
                const isActive = link.active;
                const isDisabled = !link.url;

                return (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        aria-disabled={isDisabled}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`
                            min-w-[38px] px-3 py-2 text-sm font-medium text-center rounded-md transition-all duration-200
                            ${isActive
                                ? 'bg-primary text-white shadow-md ring-1 ring-primary/40'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}
                            ${isDisabled ? 'pointer-events-none opacity-50' : ''}
                        `}
                    />
                );
            })}
        </nav>
    );
}
