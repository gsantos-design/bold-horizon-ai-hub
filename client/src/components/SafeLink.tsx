import { Link } from 'wouter';
import { ReactNode } from 'react';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

// Enhanced Link component that handles beta domain routing issues
export function SafeLink({ href, children, className, title, onClick }: SafeLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Call any custom onClick handler
    onClick?.();
    
    // Debug log for troubleshooting
    console.log(`🔗 Navigating to: ${href}`);
    
    // For beta domains or environments where routing might fail,
    // we can add fallback behavior here
    try {
      // Let wouter handle the navigation normally
      // If it fails, we can add fallback logic
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window navigation if client-side routing fails
      window.location.href = href;
    }
  };

  return (
    <Link 
      href={href}
      onClick={handleClick}
      className={className}
      title={title}
    >
      {children}
    </Link>
  );
}