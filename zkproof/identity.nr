// identity_proof.nr

use dep::std;

const TREE_DEPTH: u32 = 20;

fn poseidon_hash(inputs: [Field; 3]) -> Field {
    std::hash::poseidon(inputs)
}

fn compute_merkle_root(
    leaf: Field,
    path: [Field; TREE_DEPTH],
    index: u32
) -> Field {
    let mut hash = leaf;
    let mut idx = index;

    for i in 0..TREE_DEPTH {
        let sibling = path[i];
        if idx % 2 == 0 {
            hash = std::hash::poseidon([hash, sibling]);
        } else {
            hash = std::hash::poseidon([sibling, hash]);
        }
        idx = idx / 2;
    }
    hash
}

fn main(
    // ---------- PUBLIC INPUTS ----------
    merkle_root: pub Field,
    nullifier: pub Field,
    context: pub Field,

    // ---------- PRIVATE INPUTS ----------
    identity_secret: Field,
    pan_hash: Field,
    device_key_hash: Field,
    merkle_path: [Field; TREE_DEPTH],
    leaf_index: u32
) {
    // 1️⃣ Reconstruct identity leaf
    let identity_leaf = poseidon_hash([
        identity_secret,
        pan_hash,
        device_key_hash
    ]);

    // 2️⃣ Verify Merkle inclusion
    let computed_root = compute_merkle_root(
        identity_leaf,
        merkle_path,
        leaf_index
    );

    assert(computed_root == merkle_root);

    // 3️⃣ Generate non-escapable nullifier
    let expected_nullifier = std::hash::poseidon([
        identity_secret,
        context
    ]);

    assert(expected_nullifier == nullifier);
}
