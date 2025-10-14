import pandas as pd
import numpy as np
import tensorflow as tf
from keras_preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Embedding, GlobalAveragePooling1D, Dense, Dropout
import pickle


df = pd.read_csv('dataset.csv')
df_english = df[df['Language'] == 'en'].copy()

df_english['Certainty'] = df_english['Label'].apply(lambda x: 0 if x == 'uncertainty' else 1)

df_clean = df_english[['Text', 'Certainty']]

texts = df_clean['Text'].tolist()
labels = df_clean['Certainty'].tolist()

training_size = int(len(texts)*0.8)

training_texts = texts[0:training_size]
testing_texts = texts[training_size:]

training_labels = labels[0:training_size]
testing_labels = labels[training_size:]

tokenizer = Tokenizer(num_words=10000, oov_token='<OOV>')
tokenizer.fit_on_texts(training_texts)

training_sequences = tokenizer.texts_to_sequences(training_texts)
training_padded = pad_sequences(training_sequences, maxlen=100, padding='post', truncating='post')

testing_sequences = tokenizer.texts_to_sequences(testing_texts)
testing_padded = pad_sequences(testing_sequences, maxlen=100, padding='post', truncating='post')

X_train_final = np.array(training_padded)
X_test_final = np.array(testing_padded)
Y_train_final = np.array(training_labels)
Y_test_final = np.array(testing_labels)

vocab_size = len(tokenizer.word_index) + 1
embedding_dim = 64
max_length = 100

model = Sequential([
    Embedding(10000, embedding_dim, input_length=max_length),
    GlobalAveragePooling1D(),
    Dense(24, activation='relu'),
    Dropout(0.3),
    Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

num_epochs = 20
history = model.fit(X_train_final, Y_train_final, epochs=num_epochs, validation_data=(X_test_final, Y_test_final), batch_size=128, verbose=2)

sentences = ["I think I might start my program in September, but I’m not completely sure yet.",
             "My primary reason for studying in the U.S. is to pursue a master’s in computer science.",
             "I guess my uncle will help me cover part of the expenses, but I’m not entirely certain.",
             "Maybe I’ll look for internships while studying, but I haven’t decided yet."
            ]
sequences2 = tokenizer.texts_to_sequences(sentences)
padded2 = pad_sequences(sequences2, maxlen=max_length, padding='post',truncating='post')

print(model.predict(padded2))

model.save('sentiment_model.h5')

with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

print("Model and tokenizer saved successfully!")