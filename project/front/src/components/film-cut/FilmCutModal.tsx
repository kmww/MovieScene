import { ReactElement } from 'react';
import { useCutQuery } from '../../generated/graphql';
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import FilmCutInfo from './FilmCutInfo';

interface FilmCutModalProps {
  open: boolean;
  onClose: () => void;
  cutId: number;
}

const FilmCutModal = ({
  open,
  onClose,
  cutId,
}: FilmCutModalProps): ReactElement => {
  const { data, loading } = useCutQuery({
    variables: { cutId: Number(cutId) },
  });

  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  return (
    <Modal
      onClose={onClose}
      isOpen={open}
      isCentered
      size={modalSize}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent pt={2}>
        <ModalHeader>{data?.cut?.film?.title}</ModalHeader>
        <ModalCloseButton mt={3} />
        <ModalBody>
          {loading && (
            <Center py={4}>
              <Spinner />
            </Center>
          )}
          {!loading && !data && <Center>데이터를 불러오지 못했습니다.</Center>}
          {data && data.cut && (
            <FilmCutInfo
              cutImg={data.cut.src}
              cutId={data.cut.id}
              isVoted={data.cut.isVoted}
              voteCount={data.cut.voteCount}
              reviews={data.cutReviews}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilmCutModal;
