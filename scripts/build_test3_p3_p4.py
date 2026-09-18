import fitz, json, csv, re

# Load answer keys for P3 and P4
answers = {
    # Part 3
    32: 'A', 33: 'D', 34: 'A', 35: 'B', 36: 'A', 37: 'C', 38: 'C', 39: 'D', 40: 'C',
    41: 'C', 42: 'D', 43: 'B', 44: 'C', 45: 'B', 46: 'A', 47: 'D', 48: 'C', 49: 'C', 50: 'B',
    51: 'C', 52: 'D', 53: 'C', 54: 'C', 55: 'A', 56: 'C', 57: 'B', 58: 'C', 59: 'A', 60: 'C',
    61: 'D', 62: 'D', 63: 'B', 64: 'C', 65: 'A', 66: 'B', 67: 'D', 68: 'B', 69: 'B', 70: 'C',
    # Part 4
    71: 'B', 72: 'A', 73: 'D', 74: 'A', 75: 'D', 76: 'C', 77: 'C', 78: 'B', 79: 'D', 80: 'C',
    81: 'B', 82: 'A', 83: 'B', 84: 'D', 85: 'A', 86: 'B', 87: 'A', 88: 'C', 89: 'C', 90: 'D',
    91: 'A', 92: 'D', 93: 'C', 94: 'B', 95: 'C', 96: 'A', 97: 'B', 98: 'D', 99: 'C', 100: 'B'
}

# Question type mappings
p3_qtypes = {
    32: ('Purpose', 'Overview'),
    33: ('Detail', 'Detail'),
    34: ('Detail', 'Next Action'),
    35: ('Purpose', 'Overview'),
    36: ('Detail', 'Detail'),
    37: ('Next Action', 'Next Action'),
    38: ('Occupation', 'Overview'),
    39: ('Detail', 'Detail'),
    40: ('Detail', 'Detail'),
    41: ('Audience', 'Overview'),
    42: ('Detail', 'Detail'),
    43: ('Next Action', 'Next Action'),
    44: ('Detail', 'Detail'),
    45: ('Occupation', 'Overview'),
    46: ('Next Action', 'Next Action'),
    47: ('Location', 'Overview'),
    48: ('Inference', 'Implication'),
    49: ('Detail', 'Next Action'),
    50: ('Topic', 'Overview'),
    51: ('Detail', 'Detail'),
    52: ('Inference', 'Implication'),
    53: ('Detail', 'Detail'),
    54: ('Purpose', 'Overview'),
    55: ('Request', 'Next Action'),
    56: ('Topic', 'Detail'),
    57: ('Detail', 'Detail'),
    58: ('Detail', 'Detail'),
    59: ('Location', 'Overview'),
    60: ('Detail', 'Detail'),
    61: ('Problem', 'Detail'),
    62: ('Purpose', 'Overview'),
    63: ('Graphic', 'Visual Link'),
    64: ('Detail', 'Detail'),
    65: ('Location', 'Overview'),
    66: ('Graphic', 'Visual Link'),
    67: ('Next Action', 'Next Action'),
    68: ('Purpose', 'Overview'),
    69: ('Graphic', 'Visual Link'),
    70: ('Next Action', 'Next Action')
}

p4_qtypes = {
    71: ('Location', 'Overview'),
    72: ('Detail', 'Detail'),
    73: ('Recommendation', 'Next Action'),
    74: ('Topic', 'Overview'),
    75: ('Detail', 'Detail'),
    76: ('Offer', 'Detail'),
    77: ('Detail', 'Detail'),
    78: ('Detail', 'Detail'),
    79: ('Warning', 'Detail'),
    80: ('Occupation', 'Overview'),
    81: ('Inference', 'Implication'),
    82: ('Offer', 'Next Action'),
    83: ('Topic', 'Overview'),
    84: ('Detail', 'Detail'),
    85: ('Next Action', 'Next Action'),
    86: ('Audience', 'Overview'),
    87: ('Detail', 'Detail'),
    88: ('Inference', 'Implication'),
    89: ('Location', 'Overview'),
    90: ('Detail', 'Detail'),
    91: ('Invitation', 'Next Action'),
    92: ('Audience', 'Overview'),
    93: ('Detail', 'Detail'),
    94: ('Inference', 'Implication'),
    95: ('Detail', 'Detail'),
    96: ('Graphic', 'Visual Link'),
    97: ('Detail', 'Detail'),
    98: ('Audience', 'Overview'),
    99: ('Graphic', 'Visual Link'),
    100: ('Next Action', 'Next Action')
}

print('Mappings initialized.')
