
/*

    The layers are vector matrices, so the weights and biases.
    Multiply the previous layer matrix by the next one, 
    then sum the bias vector matrix, corresponding to the
    previous layer.
    Then, pass the vector product in a sigmoid function to get the vector
    result.
    
    *Note// 
        Im still figuring this out, may be wrong.
    
    ⁿ = layer number (ex: 1 (input layer))
    ᵦ = neuron
    ⁰, ₀ = zero 0 
    Ω = sigmoid function (old, there are better formulas)
    w0,0 = WEIGHT neuron¹(previous layer), neuron²(next layer)
    b = bias

    example: 
    layer1 = [n1, n2, n3]
    layer2 = [[n1, w], [n2, w], [n3, w]]
    bias(layer2) = [n1(0,2), n2(9), n3(10)]
    

    layerᵦ⁽ⁿ⁾ = Ω( (w0,0 * layer₀⁽⁰⁾) + (w0,1 * layer₁⁽⁰⁾) ... + b₀)

    same as: Ω(w⁽ⁿ⁾ * layer⁽ⁿ⁾ + b)

    Ω(layer2[0][0] * layer1[0][0] + bias[0]) = corresponding vector

*/
// const NC = [5, 6, 4]
class NeuralNetwork {
    constructor(neuronCount) { //the number of neurons in each layer
        this.levels = []
        for (let i = 0; i < neuronCount.length - 1; i++) {
            this.levels.push(new Level(
                neuronCount[i],
                neuronCount[i + 1]
            ))
        }
    }

    static feedForward(givenInputs, network) {
        /*response from each layer*/
        let outputs = Level.feedForward(
            givenInputs,
            network.levels[0]
        )

        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                outputs,
                network.levels[i]
            )
        }

        return outputs
    }
}

// class Level {
//     constructor(inputCount, outputCount) {
//         this.inputs = new Array(inputCount)
//         this.outputs = new Array(outputCount)
//         this.biases = []
//         this.weights = new Array(inputCount)


//         for (let i = 0; i < inputCount; i++) {
//             this.weights[i] = new Array(outputCount)
//         }

//         this.#randomize(this)
//     }

//     static #randomize(level) {
//         for (let i = 0; i < level.inputs; i++) {
//             for (let k = 0; k < level.outputs; k++) {
//                 level.weights[i][k] = Math.random() * 2 - 1
//             }
//         }
//         for (let i = 0; i < level.biases; i++) {
//             level.biases[i] = Math.random() * 2 - 1
//         }
//     }

//     static feedForward(givenInputs, level) {
//         for (let i = 0; i < level.inputs.length; i++) {
//             level.inputs[i] = givenInputs[i]
//         }

//         for (let n = 0; n < level.outputs.length; n++) {
//             let sum = 0
//             for (let i = 0; i < level.inputs.length; i++) {
//                 sum += level.input[i] * level.weights[i][n]
//             }

//             if (sum > level.biases[n]) level.outputs[n] = 1
//             else level.outputs[n] = 0
//         }

//         return level.outputs
//     }
// }

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount)
        this.outputs = new Array(outputCount)
        this.biases = new Array(outputCount)
        this.weights = []

        //crio a shell de weights
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount)
        }

        //populo os weights e biases com numeros aleatorios
        Level.#randomize(this)
    }

    //populo a shell de weights
    //populo a shell de biases, um pra cada output
    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let n = 0; n < level.outputs.length; n++) {
                level.weights[i][n] = Math.random() * 2 - 1
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1
        }
    }

    //populo a shell de inputs
    //calculo e populo a shell de outputs
    //retorno outputs pois são o resultado
    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i]
        }

        for (let i = 0; i < level.outputs.length; i++) {

            let sum = 0

            for (let n = 0; n < level.inputs.length; n++) {
                sum += level.inputs[n] * level.weights[n][i]
            }

            if (sum > level.biases[i]) {
                level.outputs[i] = 1
            }
            else {
                level.outputs[i] = 0
            }
        }

        return level.outputs
    }


}