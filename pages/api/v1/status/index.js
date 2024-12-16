function status(request, response) {
  response.status(200).json({ valor: "Deu certo àgua" });
}

export default status;
