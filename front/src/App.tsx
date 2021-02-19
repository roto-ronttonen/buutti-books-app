import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import useSWR from "swr";
import {
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { BookForm, BookFormFields } from "./components/BookForm";
import axios from "axios";
import { BookAccordion } from "./components/BookAccordion";

const booksUrl = `${process.env.REACT_APP_API_URL}/books`;

function App() {
  const { data, error, mutate } = useSWR<Resources.Book[]>(booksUrl);

  const [activeBookId, setActiveBookId] = useState<string | undefined | null>(
    null
  );

  const [saving, setSaving] = useState(false);

  const [alert, setAlert] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!!error) {
      setAlert({
        severity: "error",
        message: "Tried fetching data, but it failed :O",
      });
    }
  }, [error, setAlert]);

  const addBook = useCallback(
    async (values: BookFormFields) => {
      try {
        setSaving(true);
        const res = await axios.post<Resources.Book>(booksUrl, values);
        const { _id } = res.data;
        setActiveBookId(_id);
        await mutate([...(!!data ? data : []), res.data]);
        setAlert({ severity: "success", message: "Added the book!" });
      } catch (e) {
        setAlert({ severity: "error", message: "Adding the book failed :(" });
      } finally {
        setSaving(false);
      }
    },
    [setSaving, setActiveBookId, data, mutate, setAlert]
  );

  const updateBook = useCallback(
    async (id: string, values: BookFormFields) => {
      try {
        setSaving(true);
        const res = await axios.put<Resources.Book>(
          `${booksUrl}/${id}`,
          values
        );
        await mutate(
          data?.map((d) => {
            if (d._id === res.data._id) {
              return res.data;
            }
            return d;
          })
        );
        setAlert({ severity: "success", message: "Book saved!" });
      } catch (e) {
        setAlert({ severity: "error", message: "Updating the book failed :(" });
      } finally {
        setSaving(false);
      }
    },
    [setSaving, setAlert, mutate, data]
  );

  const deleteBook = useCallback(
    async (id: string) => {
      try {
        setSaving(true);
        const res = await axios.delete<Resources.Book>(`${booksUrl}/${id}`);
        const clone = data ? data.slice(0) : [];
        const delIndex = clone.findIndex((c) => c._id === res.data._id);
        clone.splice(delIndex, 1);
        await mutate(clone);
        setAlert({ severity: "success", message: "Book was deleted! Hooray?" });
        setActiveBookId(clone[delIndex]?._id ?? clone[delIndex - 1]?._id);
      } catch (e) {
        setAlert({
          severity: "error",
          message: "Hmmmmmm... unable to delete this book",
        });
      } finally {
        setSaving(false);
      }
    },
    [setSaving, setAlert, mutate, data, setActiveBookId]
  );

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, [setAlert]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h1">Book app</Typography>
        <Grid container spacing={2}>
          {!data && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {data?.length === 0 && (
            <Grid item xs={12}>
              <BookForm
                formTitle="Create your first book"
                onAdd={addBook}
                book={null}
              />
            </Grid>
          )}

          {data?.map((d) => (
            <Grid key={`${d._id}`} item xs={12}>
              <BookAccordion
                disabled={saving}
                book={d}
                onAdd={addBook}
                onUpdate={updateBook}
                onDelete={deleteBook}
                open={d._id === activeBookId}
                onToggle={() => {
                  if (d._id === activeBookId) {
                    setActiveBookId(null);
                  } else {
                    setActiveBookId(d._id);
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={!!alert?.severity && !!alert?.message}
        autoHideDuration={3000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
