export function ProjectTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto mb-6 rounded-lg border border-border">
      <table className="w-full text-[15px] border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[13px] font-medium tracking-widest uppercase text-muted-foreground px-4 py-2 border-b border-border">File</th>
            <th className="text-left text-[13px] font-medium tracking-widest uppercase text-muted-foreground px-4 py-2 border-b border-border">Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([file, responsibility]) => (
            <tr key={file} className="border-b border-border last:border-0">
              <td className="px-4 py-2.5">
                <code className="text-[14px] bg-muted px-1.5 py-0.5 rounded">{file}</code>
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">
                {responsibility}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
