import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ReactComponent as WatchlistIcon } from "../../icons/watchlist.svg";
import { ReactComponent as PrivateTagsIcon } from "../../icons/private-tags.svg";
import { ReactComponent as PublicTagsIcon } from "../../icons/public-tags.svg";
import { ReactComponent as ApiKeysIcon } from "../../icons/api-keys.svg";
import { ReactComponent as CustomAbiIcon } from "../../icons/custom-abi.svg";
import { styled } from "../../styles";

export type Link = {
  href: string;
  name: string;
  IconComponent: React.FC;
  disabled?: boolean;
};

const LINKS: Link[] = [
  {
    href: "/watchlist",
    name: "Watchlist",
    IconComponent: WatchlistIcon,
  },
  {
    href: "/private-tags",
    name: "Private tags",
    IconComponent: PrivateTagsIcon,
    disabled: true,
  },
  {
    href: "/public-tags",
    name: "Public tags",
    IconComponent: PublicTagsIcon,
    disabled: true,
  },
  {
    href: "/api-keys",
    name: "API Keys",
    IconComponent: ApiKeysIcon,
    disabled: true,
  },
  {
    href: "/custom-abi",
    name: "Custom ABI",
    IconComponent: CustomAbiIcon,
    disabled: true,
  },
];

const Wrapper = styled("nav", {
  marginTop: 38,
});

const List = styled("ul", {
  listStyleType: "none",
  paddingInlineStart: 0,
});

const ListElement = styled("li", {
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  minWidth: 220,

  variants: {
    active: {
      true: {
        backgroundColor: "#04795B",
        color: "white",
        "&:hover": {
          backgroundColor: "#04795B",
        },
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      false: {
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgb(4, 121, 91, 0.5)",
          color: "white",
        },
      },
    },
  },

  "& + &": {
    marginTop: 4,
  },
});

const ListImage = styled("div", {
  marginRight: 16,

  "& > svg": {
    display: "block",
  },
});

const Header = styled("div", {
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "15px",
  color: "#767676",
  marginLeft: 16,
});

export const Menu: React.FC = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Header>Watch List & Notes</Header>
      <List>
        {LINKS.map((link) => (
          <ListElement
            key={link.href}
            active={router.pathname.startsWith(link.href)}
            disabled={!!link.disabled}
          >
            <ListImage>
              <link.IconComponent />
            </ListImage>
            {link.disabled ? (
              link.name
            ) : (
              <Link href={link.href}>{link.name}</Link>
            )}
          </ListElement>
        ))}
      </List>
    </Wrapper>
  );
};
