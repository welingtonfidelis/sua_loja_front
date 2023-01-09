import {
  Avatar,
  AvatarBadge,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetClientCompanyProfile } from "../../services/requests/client";
import {
  Container,
  HeaderContent,
  HeaderIconsContent,
  LogoCompanyContent,
  SearchButtonContent,
  SearchColumnContent,
} from "./styles";
import { clientProductListPageStore } from "../../store/clientProductListPage";
import { PageFilter } from "./components/pageFilter";

export const ClientProductList = () => {
  const params = useParams();
  const company_name_key = params.company_name_key || "";
  const { data: companyProfile, isLoading: companyProfileIsLoading } =
    useGetClientCompanyProfile({ company_name_key });
  const { filters } = clientProductListPageStore();

  return (
    <Container>
      <HeaderContent>
        <LogoCompanyContent>
          {companyProfile?.image_url ? (
            <img src={companyProfile.image_url} alt="Company logo" />
          ) : (
            <Avatar
              name={companyProfile?.name}
              src={companyProfile?.image_url}
            />
          )}
        </LogoCompanyContent>

        <SearchColumnContent>
          <span>{companyProfile?.name}</span>
          <InputGroup>
            <Input placeholder="Produto" />
            <InputRightElement>
              <SearchButtonContent>
                <Button colorScheme="blue">
                  <div>
                    <FaSearch />
                  </div>
                </Button>
              </SearchButtonContent>
            </InputRightElement>
          </InputGroup>
        </SearchColumnContent>

        <HeaderIconsContent>
          <Avatar name="" src="" size="sm" />
          <Avatar name="" src="" size="sm" icon={<FaShoppingCart />}>
            <AvatarBadge boxSize="1.5em" bg="green.500">
              0
            </AvatarBadge>
          </Avatar>
        </HeaderIconsContent>
      </HeaderContent>

      <aside>
        <PageFilter company_name_key={company_name_key} />
      </aside>
    </Container>
  );
};
