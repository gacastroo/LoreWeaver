from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

print("Cargando modelo GPT-2...")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
print("Modelo cargado.")

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '')
    inputs = tokenizer(prompt, return_tensors='pt')
    outputs = model.generate(
        inputs['input_ids'],
        max_length=200,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        top_k=50
    )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'idea': text})

if __name__ == '__main__':
    app.run(port=5000)
