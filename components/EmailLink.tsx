interface EmailLinkProps {
  email: string;
  subject: string;
  body: string;
  children: React.ReactNode;
  className?: string;
}

export default function EmailLink({
  email,
  subject,
  body,
  children,
  className = "",
}: EmailLinkProps) {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
