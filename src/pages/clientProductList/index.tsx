import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaCar, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useGetClientCategoryOptionsFormat,
  useGetClientCompanyProfile,
} from "../../services/requests/client";
import {
  Container,
  HeaderContent,
  HeaderIconsContent,
  LogoCompanyContent,
  SearchButtonContent,
  SearchColumnContent,
} from "./styles";

export const ClientProductList = () => {
  const params = useParams();
  const company_name_key = params.company_name_key || "";
  const { data: companyProfile, isLoading: companyProfileIsLoading } =
    useGetClientCompanyProfile({ company_name_key });
  const { data: categoryOptions, isLoading: categoryOptionsIsLoading } =
    useGetClientCategoryOptionsFormat(company_name_key);

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
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        </HeaderIconsContent>
      </HeaderContent>
    </Container>
  );
};
