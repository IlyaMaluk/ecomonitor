import React from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {router, useForm} from '@inertiajs/react';

const CreateSubstance = ({ substances }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        class: '',
        tlv: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/substances');
    };

    const handleDelete = (id) => {
        router.delete(`/substances/${id}`);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Создать субстанцию
                </Typography>
                <form onSubmit={submit} noValidate>
                    <TextField
                        label="Название"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Класс"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.class}
                        onChange={(e) => setData('class', e.target.value)}
                        error={Boolean(errors.class)}
                        helperText={errors.class}
                    />
                    <TextField
                        label="ПДК (TLV)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.tlv}
                        onChange={(e) => setData('tlv', e.target.value)}
                        error={Boolean(errors.tlv)}
                        helperText={errors.tlv}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Создать
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Список субстанций
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Название</TableCell>
                                <TableCell>Класс</TableCell>
                                <TableCell>ПДК (TLV)</TableCell>
                                <TableCell align="right">Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {substances.length > 0 ? (
                                substances.map((substance) => (
                                    <TableRow key={substance.id}>
                                        <TableCell>{substance.id}</TableCell>
                                        <TableCell>{substance.title}</TableCell>
                                        <TableCell>{substance.class}</TableCell>
                                        <TableCell>{substance.tlv}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDelete(substance.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Нет субстанций
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default CreateSubstance;
