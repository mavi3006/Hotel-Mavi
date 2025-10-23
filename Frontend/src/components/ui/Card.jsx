import { clsx } from 'clsx';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'mb-4 pb-4 border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={clsx(
        'text-lg font-semibold text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={clsx(
        'text-sm text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'mt-4 pt-4 border-t border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};
