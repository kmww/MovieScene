import { ReactElement } from 'react';
import { useCutQuery } from '../../generated/graphql';
import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';

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
      <ModalContent>
        <ModalBody>
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
          {!loading && !data && <Center>데이터를 불러오지 못했습니다.</Center>}
          {data && data.cut && <div>film cut infomation</div>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FilmCutModal;
