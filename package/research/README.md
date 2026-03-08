# Research Workspace

This folder is dedicated to model training and experiments.

## Goals
- Keep training workflows separate from backend serving runtime.
- Track datasets and experiments without polluting deployment code.
- Export model artifacts that can be loaded by `backend/models/detection.py`.

## Recommended layout
- `configs/` for model and data configs
- `scripts/` for training and evaluation entrypoints
- `checkpoints/` for local checkpoints (ignored by git)
- `reports/` for metrics and plots

## Dependency setup

```bash
cd research
pip install -r requirements-train.txt
```

## Artifact handoff contract
- Export weight file (for now PyTorch `state_dict`)
- Save preprocessing config (image size, normalization, frame sampling)
- Save label mapping and model version metadata

The backend only consumes exported artifacts; do not run training jobs in `backend/`.
