def sum(arr):
    if len(arr) == 1:
        return arr[0]
    else:
        arr[0] = arr.pop(-1) + arr[0]
        return sum(arr)

print(sum([1, 2, 3, 6, 10]))

    #JS
    #   function sum (arr) {
    #   if (arr.length === 1) {
    #     return arr[0]
    #   } else {
    #     arr[0] = arr.shift() + arr[0]
    #     return sum(arr)
    #   }
    # }
    #
    # b = sum([1, 2, 3])
