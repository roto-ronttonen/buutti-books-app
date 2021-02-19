import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { BookForm, BookFormProps } from "./BookForm";

type BookAccordionProps = BookFormProps & {
  open: boolean;
  onToggle: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
};

export const BookAccordion = ({
  open,
  onToggle,
  onAdd,
  onDelete,
  onUpdate,
  book,
}: BookAccordionProps) => {
  return (
    <Accordion expanded={open} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="book-card-content"
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="subtitle2" align="left">
              Name: {book?.name || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" align="left">
              Author: {book?.author || "-"}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={12}>
            <BookForm
              key={open ? "o" : "c" /** reset form state on toggle */}
              book={book}
              onAdd={onAdd}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
