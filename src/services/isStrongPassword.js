export const isStrongPassword = (password) => {
    //pide al menos 8 carácteres, una mayúscula, una minúscula, un número y un símbolo
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}