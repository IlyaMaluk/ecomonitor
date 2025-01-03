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
import {Link, router, useForm} from '@inertiajs/react';

const CreateSubstance = ({ substances }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        class: '',
        tlv: '',
        rfc: '',
        c: '',
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
                    Додати забруднюючу речовину
                </Typography>
                <form onSubmit={submit} noValidate>
                    <TextField
                        label="Назва"
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
                        label="Клас небезпеки"
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
                        label="ГДК"
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
                    <TextField
                        label="RFC"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.rfc}
                        onChange={(e) => setData('rfc', e.target.value)}
                        error={Boolean(errors.rfc)}
                        helperText={errors.rfc}
                    />
                    <TextField
                        label="C"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.c}
                        onChange={(e) => setData('c', e.target.value)}
                        error={Boolean(errors.c)}
                        helperText={errors.c}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Додати
                    </Button>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Button
                        component={Link}
                        href="/"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Повернутись на головну
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Список забруднюючих речовин
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Назва</TableCell>
                                <TableCell>Клас</TableCell>
                                <TableCell>ГДК(мг/м^3)</TableCell>
                                <TableCell>RFC</TableCell>
                                <TableCell>C</TableCell>
                                <TableCell align="right">Дії</TableCell>
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
                                        <TableCell>{substance.rfc}</TableCell>
                                        <TableCell>{substance.c}</TableCell>
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
                                        Нема забруднюючих речовин
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
