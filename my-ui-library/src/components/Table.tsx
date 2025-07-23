/**
 * @file src/components/ui/Table.tsx
 * @description 汎用テーブルコンポーネント
 */
type Data = Record<string, any>;
type HeaderData = { label: string; value: string };

type Props = {
    datas: Data[],
    colName: HeaderData[],
}
export const Table = ({ datas, colName }: Props) => {
    console.log(datas);
    return (
        <table className="min-w-full border-collapse divide-y divide-stone-200">
            <thead className="bg-stone-100 border-b-2 border-stone-200 divide-x divide-stone-200 sticky top-0 z-10">
                <tr className="divide-x divide-stone-200">
                    {colName.map(({ label, value }) => {
                        return (
                            <th
                                key={label}
                                scope="col"
                                className="px-4 py-2 text-left text-sm font-medium"
                            >
                                {value}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
                {datas.map((data, idx) => {
                    return (
                        <tr key={idx} className="divide-x divide-stone-200">
                            {colName.map(({ label }) => {
                                const tData = data[label];
                                return (
                                    <td key={label} className="px-4 py-1 text-sm">
                                        {tData}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}