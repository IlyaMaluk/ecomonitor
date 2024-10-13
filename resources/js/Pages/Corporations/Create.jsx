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
import { router, useForm, Link } from '@inertiajs/react';

const CreateCorporation = ({ corporations }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        address: '',
        type: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/corporations');
    };

    const handleDelete = (id) => {
        router.delete(`/corporations/${id}`);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Створити корпорацію
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
                        label="Адреса"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                    />
                    <TextField
                        label="Тип"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        error={Boolean(errors.type)}
                        helperText={errors.type}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Створити
                    </Button>
                </form>

                {/* Button to navigate to the / route */}
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
                    Список корпорацій
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Назва</TableCell>
                                <TableCell>Адреса</TableCell>
                                <TableCell>Тип</TableCell>
                                <TableCell align="right">Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {corporations.length > 0 ? (
                                corporations.map((corp) => (
                                    <TableRow key={corp.id}>
                                        <TableCell>{corp.id}</TableCell>
                                        <TableCell>{corp.title}</TableCell>
                                        <TableCell>{corp.address}</TableCell>
                                        <TableCell>{corp.type}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDelete(corp.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Немає корпорацій
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

export default CreateCorporation;
