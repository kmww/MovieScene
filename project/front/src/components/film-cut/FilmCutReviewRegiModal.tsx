import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  CutDocument,
  CutQuery,
  CreateOrUpdateCutReviewMutationVariables as CutReviewVars,
  useCreateOrUpdateCutReviewMutation as useCreateCutReview,
} from '../../generated/graphql';
interface FilmCutReviewRegiModalProps {
  cutId: number;
  isOpen: boolean;
  onClose: () => void;
}

const FilmCutReviewRegiModal = ({
  cutId,
  isOpen,
  onClose,
}: FilmCutReviewRegiModalProps): ReactElement => {
  const toast = useToast();
  const [mutation, { loading }] = useCreateCutReview();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CutReviewVars>({
    defaultValues: {
      cutReviewInput: { cutId },
    },
  });

  const onSubmit = (formData: CutReviewVars): void => {
    mutation({
      variables: formData,
      update: (cache, { data }) => {
        if (data && data.createOrUpdateCutReview) {
          const currentCut = cache.readQuery<CutQuery>({
            query: CutDocument,
            variables: { cutId },
          });
          if (currentCut) {
            const isEdited = currentCut.cutReviews
              .map((review) => review.id)
              .includes(data.createOrUpdateCutReview.id);
            if (isEdited) {
              cache.evict({
                id: `CutReview:${data.createOrUpdateCutReview.id}`,
              });
            }
            cache.writeQuery<CutQuery>({
              query: CutDocument,
              data: {
                ...currentCut,
                cutReviews: isEdited
                  ? [...currentCut.cutReviews]
                  : [
                      data.createOrUpdateCutReview,
                      ...currentCut.cutReviews.slice(0, 1),
                    ],
              },
              variables: { cutId },
            });
          }
        }
      },
    })
      .then(onClose)
      .catch(() => {
        toast({ title: '리뷰 등록 실패', status: 'error' });
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>리뷰 남기기</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!errors.cutReviewInput?.contents}>
            <Textarea
              {...register('cutReviewInput.contents', {
                required: { value: true, message: '리뷰를 입력해주세요.' },
                maxLength: {
                  value: 500,
                  message: '500자를 초과할 수 없습니다.',
                },
              })}
              placeholder="장면에 대한 개인적인 감상을 남겨주세요."
            />
            <FormErrorMessage>
              {errors.cutReviewInput?.contents?.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button colorScheme="teal" type="submit" isDisabled={loading}>
              등록
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilmCutReviewRegiModal;
