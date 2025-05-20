from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

# 🛡️ Permitir CORS desde Vercel
CORS(app, origins=["https://lore-weaver-1zpq.vercel.app"], methods=["POST"])

print("🔄 Cargando modelo GPT-2...")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
print("✅ Modelo cargado.")

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'El campo prompt está vacío'}), 400

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
    app.run(host="0.0.0.0", port=5000)
