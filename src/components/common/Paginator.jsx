import styled, { css } from "styled-components";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_200,
  GRAY_500,
  PRIMARY_50,
  PRIMARY_600,
} from "@constants/colors";
import usePagination, { DOTS } from "@hooks/usePagination";

const Wrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled(FlexBox)`
  column-gap: 1.25rem;
  align-items: center;
  padding-top: 1.25rem;
  border-top: 1px solid ${GRAY_200};
`;

const Nav = styled(FlexBox)`
  cursor: pointer;
  column-gap: 0.25rem;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      display: none;
    `}
`;

const PageNumber = styled(FlexBox)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  background-color: ${WHITE};

  ${Text} {
    font-weight: 500;
    color: ${GRAY_500};
    font-size: 0.875rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_50};

      ${Text} {
        color: ${PRIMARY_600};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

const commonTextStyle = {
  weight: 500,
  color: GRAY_500,
  size: "0.875rem",
};

const Paginator = ({
  totalPages = 10,
  currentPage = 1,
  siblingCount = 1,
  handlePageChange = () => {},
}) => {
  const paginationRange = usePagination({
    totalPages,
    currentPage,
    siblingCount,
  });

  const lastPage = paginationRange?.[paginationRange?.length - 1];

  if (!totalPages || paginationRange?.length < 2) return null;

  return (
    <Wrapper>
      <Container>
        <Nav
          disabled={currentPage === 1}
          onClick={() => handlePageChange(prev => prev - 1)}
        >
          <FiArrowLeft color={GRAY_500} />
          <Text {...commonTextStyle}>Previous</Text>
        </Nav>

        <FlexBox align="center">
          {paginationRange?.map((page, i) => {
            if (page === DOTS) {
              return (
                <PageNumber key={page} disabled>
                  <Text>&#8230;</Text>
                </PageNumber>
              );
            }

            return (
              <PageNumber
                key={page}
                selected={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                <Text>{page}</Text>
              </PageNumber>
            );
          })}
        </FlexBox>

        <Nav
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(prev => prev + 1)}
        >
          <Text {...commonTextStyle}>Next</Text>
          <FiArrowRight color={GRAY_500} />
        </Nav>
      </Container>
    </Wrapper>
  );
};

export default Paginator;
