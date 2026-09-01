import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Figure } from '@/components/Figure'
import { ProjectHeader } from '@/components/ProjectHeader'
import { ProjectTable } from '@/components/ProjectTable'

const PROSE = 'text-[18px] text-foreground/75 leading-[1.78]'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Available in every .mdx file without an import.
    Figure,
    ProjectHeader,
    ProjectTable,

    h1: ({ children }) => (
      <h1 className="text-[38px] sm:text-[52px] font-medium tracking-[-0.025em] leading-[1.05] mb-6 mt-0">{children}</h1>
    ),
    // The rule above is what separates sections, so h2 carries no extra weight.
    h2: ({ children }) => (
      <h2 className="text-[26px] sm:text-[30px] font-medium tracking-[-0.02em] mt-12 mb-4 pt-7 border-t border-rule">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[21px] font-medium tracking-[-0.01em] mt-9 mb-2.5">{children}</h3>
    ),
    p: ({ children }) => <p className={`${PROSE} mb-5`}>{children}</p>,
    a: ({ href, children }) => (
      <Link
        href={href ?? ''}
        target={href?.startsWith('http') ? '_blank' : undefined}
        className="link-rule text-foreground"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className={`${PROSE} mb-6 ml-5 list-disc marker:text-muted-foreground/50 space-y-2`}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className={`${PROSE} mb-6 ml-5 list-decimal marker:text-muted-foreground/50 space-y-2`}>{children}</ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent-ink/50 pl-5 my-7 [&>p]:mb-0 [&>p]:italic [&>p]:text-foreground/70">
        {children}
      </blockquote>
    ),
    pre: ({ children, ...props }) => (
      <pre className="rounded-lg max-w-full overflow-x-auto text-[13px] leading-relaxed mb-6 py-4 px-4 bg-muted border border-rule text-foreground/85" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      const isBlock = className?.includes('language-')
      return isBlock ? (
        <code className={`${className} font-mono`}>{children}</code>
      ) : (
        // Accent is reserved for inline identifiers. Blocks stay neutral,
        // since a fully tinted block reads as broken syntax highlighting.
        <code
          className="font-mono text-[0.86em] bg-muted border border-rule px-1.5 py-0.5 rounded text-accent-ink"
          style={{ overflowWrap: 'anywhere' }}
        >
          {children}
        </code>
      )
    },
    th: ({ children }) => (
      <th className="label text-left px-4 py-3 border-b border-rule">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-rule last:border-0 text-[15px] sm:text-[16px] text-foreground/75 align-top">{children}</td>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-rule">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    hr: () => <hr className="border-rule my-10" />,
    ...components,
  }
}
