import React from "react";
import { styled } from "../../styles";

const Wrapper = styled("table", {
  borderSpacing: 24,
  margin: -24,
  marginVertical: 0,
  width: "100%",
});

const TableHeaderCell = styled("th", {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17px",
  color: "#767676",

  textAlign: "left",
});

const TableBorderCell = styled("td", {
  borderBottom: "1px solid #E5E5E5",
});

const TableCell = styled("td", {
  verticalAlign: "top",
});

type Props = {
  header: string[];
  rows: {
    key: string;
    cells: {
      key: string;
      node: React.ReactNode;
    }[];
  }[];
};

export const Table: React.FC<Props> = ({ header, rows }) => {
  const columns = Math.max(rows[0]?.cells.length ?? 1, header.length);
  return (
    <Wrapper>
      <thead>
        <tr>
          {header.map((element, index) => (
            <TableHeaderCell key={index}>{element || ""}</TableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <TableBorderCell colSpan={columns} />
        </tr>
        {rows.map((row) => (
          <React.Fragment key={row.key}>
            <tr>
              {row.cells.map((cell) => (
                <TableCell key={cell.key}>{cell.node}</TableCell>
              ))}
            </tr>
            <tr>
              <TableBorderCell colSpan={5} />
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Wrapper>
  );
};
