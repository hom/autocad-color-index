import {
  Card,
  Row,
  Col,
  Tooltip,
  Typography,
  Descriptions,
  message,
} from 'antd';
import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import { colors } from './colors';

message.config({
  maxCount: 1,
});

function hexToRgb(value) {
  return value.replace(/#(\w{2})(\w{2})(\w{2})/g, (_, $1, $2, $3) => {
    if (!$1 || !$2 || !$3) return '/';
    return `rgb(${parseInt($1, 16)}, ${parseInt($2, 16)}, ${parseInt($3, 16)})`;
  });
}

const ColorInfo = ({ data }) => {
  return (
    <>
      <span>{data.color}</span>
      <br />
      <span>{hexToRgb(data.color)}</span>
      <br />
      <span>{data.i}</span>
      <br />
    </>
  );
};

const ColorPicker = ({ data, selected, setSelected }) => (
  <Tooltip title={<ColorInfo data={data} />}>
    <Col
      className={[
        'color',
        selected && selected.color === data.color ? 'color--selected' : '',
      ]}
      style={{
        backgroundColor: data.color,
        height: '40px',
      }}
      span={1}
      onClick={() => {
        copy(data.color);
        message.info('Copied');
        setSelected(data);
      }}
    ></Col>
  </Tooltip>
);

export const AutocadColorIndex = () => {
  const [selected, setSelected] = useState(null);
  const cols = 24;
  const grids = [];
  new Array(5).fill(0).forEach((_, i) =>
    grids.push(
      new Array(cols).fill(0).map((_, j) => {
        const index = j * 10 + 18 - i * 2;
        return { color: colors[index], i: index };
      })
    )
  );
  new Array(5).fill(0).forEach((_, i) =>
    grids.push(
      new Array(cols).fill(0).map((_, j) => {
        const index = j * 10 + 11 + i * 2;
        return { color: colors[index], i: index };
      })
    )
  );
  return (
    <div className="wrapper">
      <h1>AutoCAD 颜色索引</h1>
      <Card>
        {grids.map((row, i) => (
          <>
            <Row>
              {row.map((col, j) => (
                <ColorPicker
                  key={j}
                  data={col}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </Row>
            {i === 4 && <br />}
          </>
        ))}
        <br />
        <p>索引颜色</p>
        <Row>
          {colors.slice(1, 9).map((color, i) => (
            <ColorPicker
              key={i}
              data={{ color: color, i: i + 1 }}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </Row>
      </Card>
      <br />
      <Card>
        <Descriptions title="颜色值">
          <Descriptions.Item label="十六进制颜色">
            {selected ? (
              <Typography.Paragraph copyable>
                {selected.color}
              </Typography.Paragraph>
            ) : (
              '/'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="RGB">
            {selected ? (
              <Typography.Paragraph copyable>
                {hex2rgb(selected.color)}
              </Typography.Paragraph>
            ) : (
              '/'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="颜色索引">
            {selected ? (
              <Typography.Paragraph copyable>{selected.i}</Typography.Paragraph>
            ) : (
              '/'
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
