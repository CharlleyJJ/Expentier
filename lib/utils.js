export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency"
    });

    return formatter.format(amount)
};

// Utilize o código de idioma adequado para o formato desejado
export const dataFormatter = (data) => {
    const createdAt = new Date(data);
    const formattedDate = createdAt.toLocaleDateString('pt-BR');
    
return formattedDate;
};