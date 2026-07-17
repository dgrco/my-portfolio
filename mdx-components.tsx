import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 mt-0 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-medium tracking-tight mt-10 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-[17px] text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href ?? ''} className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="text-[17px] text-muted-foreground leading-relaxed mb-4 ml-5 list-disc space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-[17px] text-muted-foreground leading-relaxed mb-4 ml-5 list-decimal space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    pre: ({ children, ...props }) => (
        <pre className="rounded-lg max-w-full overflow-x-auto text-[13px] mb-4 py-4 px-4 bg-muted text-amber-900 dark:text-blue-300" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-')
      return isBlock ? (
        <code className={`${className} font-mono text-[14px] text-amber-900 dark:text-blue-300`}>{children}</code>
      ) : (
        <code
          className="text-[17px] font-serif bg-muted px-1.5 py-0.5 rounded text-amber-900 dark:text-blue-300"
          style={{ overflowWrap: 'anywhere' }}
        >
          {children}
        </code>
      )
    },
    th: ({ children }) => (
      <th className="text-left text-[14px] font-medium tracking-widest uppercase text-muted-foreground px-4 py-2 border-b border-border">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 border-b border-border text-[16px] text-muted-foreground">{children}</td>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-border">
        <table className="w-full text-[16px] border-collapse">{children}</table>
      </div>
    ),
    hr: () => <hr className="border-border my-8" />,
    ...components,
  }
}
