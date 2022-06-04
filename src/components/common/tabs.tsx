import * as React from "react";
import { styled } from "../../styles";

const Wrapper = styled("div", {});

const PADDING = 12;

const TabLabels = styled("div", {
  padding: 0,
  marginHorizontal: -PADDING,
  display: "flex",
  position: "relative",
  marginBottom: 24,
});

const TabHeader = styled("div", {
  padding: PADDING,
  zIndex: 1,
  color: "#04795B",
  cursor: "pointer",

  "& + &": {
    marginLeft: 12,
  },

  variants: {
    active: {
      true: {
        color: "#000",
      },
    },
  },

  transition: "all 0.15s ease-in",
});

const Tab = styled("div", {
  display: "none",

  variants: {
    selected: {
      true: {
        display: "block",
      },
    },
  },
});

const TabBackground = styled("div", {
  borderRadius: 6,
  background: "rgba(221, 225, 232, 0.3)",

  position: "absolute",
  top: 0,
  transition: "all 0.15s ease-in",
});

type TabProps = {
  id: string;
  label: React.ReactNode;
  node: React.ReactNode;
};

type Props = {
  children: TabProps[];
};

export const Tabs: React.FC<Props> = React.memo((props) => {
  const [selectedId, setSelectedId] = React.useState(props.children[0].id);
  const labelsElementRef = React.useRef<HTMLDivElement>(null);
  const labelsRecordRef = React.useRef<Record<string, HTMLDivElement | null>>(
    {}
  );
  const [backgroundPosition, setBackgroundPosition] = React.useState<{
    left: number;
    height: number;
    width: number;
  }>({
    left: 0,
    height: 0,
    width: 0,
  });
  React.useEffect(() => {
    const selectedLabelRef = labelsRecordRef.current[selectedId];
    if (!selectedLabelRef) {
      return;
    }
    setBackgroundPosition({
      width: selectedLabelRef.offsetWidth,
      height: selectedLabelRef.offsetHeight,
      left: selectedLabelRef.offsetLeft,
    });
  }, [labelsRecordRef, selectedId, setBackgroundPosition]);

  return (
    <Wrapper>
      <TabLabels ref={labelsElementRef}>
        <TabBackground style={backgroundPosition} />
        {props.children.map(({ label, id }) => (
          <TabHeader
            key={id}
            onClick={() => setSelectedId(id)}
            ref={(element) => (labelsRecordRef.current[id] = element)}
            active={selectedId === id}
          >
            {label}
          </TabHeader>
        ))}
      </TabLabels>
      {props.children.map(({ node, id }) => {
        return (
          <Tab key={id} selected={id === selectedId}>
            {node}
          </Tab>
        );
      })}
    </Wrapper>
  );
});
