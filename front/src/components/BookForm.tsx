import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

export type BookFormProps = {
  book: Resources.Book | null;
  onAdd?: (values: BookFormFields) => void;
  onUpdate?: (id: string, values: BookFormFields) => void;
  onDelete?: (id: string) => void;
  disabled?: boolean;
  formTitle?: string;
};

export type BookFormFields = Omit<Resources.Book, "_id" | "__v">;

export const BookForm = ({
  book,
  onAdd,
  onUpdate,
  onDelete,
  disabled,
  formTitle,
}: BookFormProps) => {
  const theme = useTheme();
  const {
    control,
    errors,
    handleSubmit,
    getValues,
    trigger,
  } = useForm<BookFormFields>({
    defaultValues: {
      name: book?.name ?? "",
      author: book?.author ?? "",
      description: book?.description ?? "",
    },
  });

  const addBook = useCallback(
    async (values: BookFormFields) => {
      if (disabled) {
        return;
      }
      onAdd?.(values);
    },
    [onAdd, disabled]
  );
  const updateBook = useCallback(async () => {
    const valid = await trigger();
    if (disabled || !valid || !book?._id) {
      return;
    }
    onUpdate?.(book._id, getValues());
  }, [onUpdate, disabled, trigger, getValues, book]);
  const deleteBook = useCallback(async () => {
    if (disabled || !book?._id) {
      return;
    }
    onDelete?.(book._id);
  }, [onDelete, disabled, book]);
  return (
    <form onSubmit={handleSubmit(addBook)}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            {formTitle ?? "Edit book"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                as={
                  <TextField
                    fullWidth
                    label="Name"
                    placeholder="Give me a name"
                    error={!!errors.name}
                    helperText={!!errors.name && "Name is required"}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="author"
                rules={{ required: true }}
                as={
                  <TextField
                    fullWidth
                    label="Author"
                    placeholder="Who wrote me?"
                    error={!!errors.author}
                    helperText={!!errors.author && "Author is required"}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="description"
                as={
                  <TextField
                    label="Description"
                    placeholder="What am i"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                {!!onAdd && (
                  <Button variant="contained" color="primary" type="submit">
                    Add a new book
                  </Button>
                )}
                {!!onUpdate && (
                  <Box ml={theme.spacing(0.2)}>
                    <Button
                      disabled={!book?._id}
                      onClick={updateBook}
                      color="primary"
                      variant="outlined"
                    >
                      Save changes
                    </Button>
                  </Box>
                )}
                {!!onDelete && (
                  <Box ml={theme.spacing(0.2)}>
                    <Button
                      disabled={!book?._id}
                      onClick={deleteBook}
                      color="secondary"
                      variant="outlined"
                    >
                      Delete this book
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
