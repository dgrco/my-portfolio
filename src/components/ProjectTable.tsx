export function ProjectTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto mb-6 rounded-lg border border-rule">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="label text-left px-4 py-3 border-b border-rule">File</th>
            <th className="label text-left px-4 py-3 border-b border-rule">Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([file, responsibility]) => (
            <tr key={file} className="border-b border-rule last:border-0">
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-[13px] bg-muted border border-rule px-1.5 py-0.5 rounded text-accent-ink whitespace-nowrap">
                  {file}
                </code>
              </td>
              <td className="px-4 py-3 text-[15px] sm:text-[16px] text-foreground/75 align-top">
                {responsibility}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
