import { useState } from "react";
import { Select as SelectSearch } from "chakra-react-select";

import {
  Container,
  LeftContent,
  LogoContainer,
  RightContent,
  SelectSearchContainer,
} from "./styles";
import { useTranslation } from "react-i18next";

import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ApplicationRoutes } from "../../shared/enum/applicationRoutes";
import { SelectedCompanyProps } from "./types";
import { Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const { LOGIN } = ApplicationRoutes;

const options = [
  {
    label: "Empresa 1",
    value: "empresa_1",
  },
  {
    label: "Empresa 2",
    value: "empresa_2",
  },
  {
    label: "Empresa 3",
    value: "empresa_3",
  },
];

export const Hub = () => {
  const [selectedCompany, setSelectedCompany] =
    useState<SelectedCompanyProps | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateStore = () => {
    console.log("->", selectedCompany?.value);
  };

  return (
    <Container>
      <div className="custom-shape-divider-top-1672065602">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <LeftContent>
        <LogoContainer>
          <img src={logoImage} alt="logo image" />
        </LogoContainer>

        <span>
          {t("pages.hub.welcome_message")} <br />{" "}
          <b>{t("generic.platform_name")}</b>
        </span>
      </LeftContent>

      <RightContent>
        <span>{t("pages.hub.select_company_message")}</span>

        <SelectSearchContainer>
          <SelectSearch
            isLoading={false}
            onChange={(e) => setSelectedCompany(e)}
            value={selectedCompany}
            options={options}
            placeholder="Empresa"
            useBasicStyles
          />
          <Button
            colorScheme="blue"
            isLoading={false}
            disabled={!selectedCompany?.value.length}
            onClick={handleNavigateStore}
          >
            <FaSearch />
          </Button>
        </SelectSearchContainer>

        <span onClick={() => navigate(LOGIN)}>
          {t("pages.hub.partner_company_message")}
        </span>
      </RightContent>
    </Container>
  );
};
