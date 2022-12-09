import { useMemo, useRef } from "react";
import { Image, useDisclosure } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

import {
  LogoImageContent,
  CloseMenuCotent,
  Container,
  DrawerMenuItem,
  MenuContent,
} from "./styles";

import { Props } from "./types";

import logoImage from "../../assets/logo.png";
import { companyStore } from "../../store/company";
import { CompanyProfile } from "./components/companyProfile";

export const DrawerMenu = (props: Props) => {
  const {
    menuOptions,
    selectedMenuOption,
    handleSelectMenuOption,
    isMenuOpen,
    handleChangeIsMenuOpen,
  } = props;
  const { company } = companyStore();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();

  const firstRender = useRef(true);

  const menuContainerClassName = useMemo(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return "";
    }

    if (isMenuOpen) return "slide-right";

    return "slide-left";
  }, [isMenuOpen]);

  const handleChangeOptionMenu = (value: string) => {
    handleSelectMenuOption(value);
    handleChangeIsMenuOpen(false);
  };

  return (
    <Container className={menuContainerClassName}>
      <CloseMenuCotent className="mobile-icon-close-drawer">
        <FaTimes onClick={() => handleChangeIsMenuOpen(false)} size={18} />
      </CloseMenuCotent>

      <LogoImageContent>
        <Image boxSize="7.5rem" src={company.image_url || logoImage} onClick={onOpenProfile}/>
      </LogoImageContent>

      <MenuContent>
        {menuOptions.map((item, index) => (
          <DrawerMenuItem
            key={index}
            selected={item.value === selectedMenuOption}
            onClick={() => handleChangeOptionMenu(item.value)}
          >
            {item.label}
          </DrawerMenuItem>
        ))}
      </MenuContent>

      <CompanyProfile isOpen={isOpenProfile} onClose={onCloseProfile} />
    </Container>
  );
};
