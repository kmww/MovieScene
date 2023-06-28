import { ReactElement, useRef } from 'react';
import { CutQuery, useDeleteCutReviewMutation } from '../../generated/graphql';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from '@chakra-ui/react';
import { COLORS } from '../../constants';

interface FilmCutReviewDeleteAlertProps {
  target?: CutQuery['cutReviews'][0];
  isOpen: boolean;
  onClose: () => void;
}

const FilmCutReviewDelete = ({
  target,
  isOpen,
  onClose,
}: FilmCutReviewDeleteAlertProps): ReactElement => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [deleteCutReview] = useDeleteCutReviewMutation();
  const handleDelete = async () => {
    if (target) {
      await deleteCutReview({
        variables: { id: target.id },
        update: (cache) => {
          cache.evict({ id: `CutReview:${target.id}` });
        },
      });
      onClose();
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          리뷰 삭제
        </AlertDialogHeader>
        <AlertDialogBody>
          리뷰를 삭제하시겠습니까? 되돌릴 수 없습니다.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            취소
          </Button>
          <Button colorScheme={COLORS.RED} onClick={handleDelete} ml={3}>
            삭제
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FilmCutReviewDelete;
