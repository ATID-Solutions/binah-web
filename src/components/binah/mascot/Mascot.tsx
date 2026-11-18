import { createContext, useContext, useId, type CSSProperties, type SVGProps } from 'react';

// Copied from the Binah app (binah repo, src/components/shared/mascot/Mascot.tsx,
// commit 76f653614). Keep in sync; motion lives in ./mascot.css.
const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

/**
 * Binah's guide mascot: a plush sheep in a felt blazer who reads as a
 * trustworthy executive (she is also the face of the Co-CEO).
 *
 * She appears whenever the platform is about to help the user (onboarding
 * hints, empty states, success moments), so every pose must read as
 * "I'm here to help" at any size. She is drawn as a soft toy: a big head on
 * a short, rounded body, stubby limbs, felt shaded with soft gradients,
 * stitched seams, minimal pill eyes behind round black glasses and wool in
 * puffy curls. The drawing is composed from layered parts (blazer, head,
 * wool, face, arms, props) so poses only swap the expressive bits and the
 * silhouette stays recognisable.
 */
export type MascotPose = 'happy' | 'wave' | 'point' | 'staff' | 'idea' | 'think' | 'celebrate';

export const MASCOT_POSES: readonly MascotPose[] = ['happy', 'wave', 'point', 'staff', 'idea', 'think', 'celebrate'];

export const MASCOT_DEFAULT_LABEL = 'Ovejita guía de Binah';

/**
 * Illustration palette. These are deliberately fixed hex values rather than
 * semantic theme tokens: the mascot is a brand asset that must render
 * identically on light, dark, and the always-dark toast shell, so her wool,
 * felt, blazer and accessories cannot follow the UI theme. `brand` matches
 * `binah-primary` (#4d37f6) so her lapel pin and staff beanie stay on-brand.
 */
const COLORS = {
    wool: '#FFFFFF',
    woolShade: '#E3DDF5',
    woolEdge: '#D2CAEE',
    faceLight: '#E0DBF1',
    face: '#CBC4E2',
    faceShade: '#A398CB',
    eye: '#251F3D',
    frame: '#1C1828',
    frameLight: '#625C78',
    brand: '#4D37F6',
    brandLight: '#8F82FF',
    brandShade: '#3A27C9',
    cheek: '#F59DB6',
    nose: '#8E80C4',
    noseLight: '#ABA0DA',
    mouth: '#5F519E',
    tongue: '#F08DAA',
    brow: '#5A4D9C',
    hoof: '#9187BF',
    hoofLight: '#B7AEDB',
    shirtShade: '#E4DFF5',
    jacket: '#322C74',
    jacketLight: '#463F96',
    jacketShade: '#211C52',
    sleeve: '#4F47A8',
    sleeveLight: '#6D65C8',
    stitch: '#7C74CF',
    shadow: '#140F2E',
    spark: '#F6B94D',
    sparkLight: '#FFE4A6',
} as const;

/** Mirrors a right-side part around the figure's vertical axis (x = 100). */
const MIRROR = 'matrix(-1 0 0 1 200 0)';

/** Running stitch along a felt seam. */
const STITCH = { fill: 'none', strokeWidth: 1, strokeDasharray: '1.8 2', strokeLinecap: 'round' } as const;

/**
 * The soft shading lives in per-instance gradients (ids derived from the
 * instance's React id, so two mascots never share or break each other's
 * paint). Parts reach them through `usePaint`.
 */
type PaintName =
    | 'head'
    | 'felt'
    | 'muzzle'
    | 'cheek'
    | 'wool'
    | 'nose'
    | 'hoof'
    | 'blazer'
    | 'sleeve'
    | 'shirt'
    | 'cap'
    | 'contact'
    | 'spark';

const PaintContext = createContext<(name: PaintName) => string>(() => 'none');

const usePaint = () => useContext(PaintContext);

/**
 * `head` is in user space so any face-coloured patch drawn over the face picks
 * up exactly the same shade where they meet.
 * Every other gradient follows its own shape; all of them light the felt from
 * above, symmetrically, so mirrored arms and legs stay consistent.
 */
function PaintDefs({ id }: { id: string }) {
    const key = (name: PaintName) => `${id}-${name}`;
    return (
        <>
            <radialGradient id={key('head')} gradientUnits="userSpaceOnUse" cx={100} cy={80} r={56}>
                <stop offset={0} stopColor={COLORS.faceLight} />
                <stop offset={0.58} stopColor={COLORS.face} />
                <stop offset={1} stopColor={COLORS.faceShade} />
            </radialGradient>
            <radialGradient id={key('felt')} cx={0.5} cy={0.32} r={0.72}>
                <stop offset={0} stopColor={COLORS.faceLight} />
                <stop offset={0.55} stopColor={COLORS.face} />
                <stop offset={1} stopColor={COLORS.faceShade} />
            </radialGradient>
            <radialGradient id={key('muzzle')}>
                <stop offset={0} stopColor={COLORS.faceLight} />
                <stop offset={0.65} stopColor={COLORS.faceLight} stopOpacity={0.7} />
                <stop offset={1} stopColor={COLORS.faceLight} stopOpacity={0} />
            </radialGradient>
            <radialGradient id={key('cheek')}>
                <stop offset={0} stopColor={COLORS.cheek} stopOpacity={0.7} />
                <stop offset={1} stopColor={COLORS.cheek} stopOpacity={0} />
            </radialGradient>
            <radialGradient id={key('wool')} cx={0.42} cy={0.36} r={0.64}>
                <stop offset={0} stopColor={COLORS.wool} />
                <stop offset={0.55} stopColor={COLORS.wool} />
                <stop offset={1} stopColor={COLORS.woolShade} />
            </radialGradient>
            <radialGradient id={key('nose')} cx={0.45} cy={0.25} r={0.75}>
                <stop offset={0} stopColor={COLORS.noseLight} />
                <stop offset={1} stopColor={COLORS.nose} />
            </radialGradient>
            <radialGradient id={key('hoof')} cx={0.5} cy={0.25} r={0.8}>
                <stop offset={0} stopColor={COLORS.hoofLight} />
                <stop offset={1} stopColor={COLORS.hoof} />
            </radialGradient>
            <radialGradient id={key('blazer')} cx={0.5} cy={0.18} r={0.9}>
                <stop offset={0} stopColor={COLORS.jacketLight} />
                <stop offset={0.5} stopColor={COLORS.jacket} />
                <stop offset={1} stopColor={COLORS.jacketShade} />
            </radialGradient>
            <linearGradient id={key('sleeve')} x1={0} y1={0} x2={0} y2={1}>
                <stop offset={0} stopColor={COLORS.sleeveLight} />
                <stop offset={0.45} stopColor={COLORS.sleeve} />
                <stop offset={1} stopColor={COLORS.jacketShade} />
            </linearGradient>
            <linearGradient id={key('shirt')} x1={0} y1={0} x2={0} y2={1}>
                <stop offset={0} stopColor={COLORS.wool} />
                <stop offset={1} stopColor={COLORS.shirtShade} />
            </linearGradient>
            <radialGradient id={key('cap')} cx={0.45} cy={0.25} r={0.85}>
                <stop offset={0} stopColor={COLORS.brandLight} />
                <stop offset={0.45} stopColor={COLORS.brand} />
                <stop offset={1} stopColor={COLORS.brandShade} />
            </radialGradient>
            <radialGradient id={key('contact')}>
                <stop offset={0} stopColor={COLORS.shadow} stopOpacity={0.4} />
                <stop offset={1} stopColor={COLORS.shadow} stopOpacity={0} />
            </radialGradient>
            <radialGradient id={key('spark')} cx={0.4} cy={0.35} r={0.7}>
                <stop offset={0} stopColor={COLORS.sparkLight} />
                <stop offset={1} stopColor={COLORS.spark} />
            </radialGradient>
        </>
    );
}

type Curl = readonly [cx: number, cy: number, r: number];

/**
 * Her wool, back to front: a ring of curls all around her face, chin
 * included, then the crown, then a fringe swept away from her part so the cut
 * still looks groomed rather than shaggy. Each curl is its own shaded puff,
 * which gives the bouclé look.
 */
const WOOL_CURLS: readonly Curl[] = [
    [100, 136.5, 7],
    [88.5, 135, 7],
    [111.5, 135, 7],
    [77.5, 130.5, 7],
    [122.5, 130.5, 7],
    [68.5, 122.5, 7],
    [131.5, 122.5, 7],
    [62.5, 111.5, 7.5],
    [137.5, 111.5, 7.5],
    [60, 99, 8],
    [140, 99, 8],
    [60.5, 86.5, 8.5],
    [139.5, 86.5, 8.5],
    [64, 72.5, 11],
    [136, 72.5, 11],
    [78.5, 60.5, 13.5],
    [121.5, 60.5, 13.5],
    [100, 55, 15.5],
    [109, 63.5, 7.5],
    [94, 64.5, 9],
    [80, 66, 8.5],
];

/**
 * A small curl ring around a centre puff, so a pompom reads round and fluffy
 * rather than as a flat disc.
 */
function pompom(cx: number, cy: number, r: number): Curl[] {
    const ring = Array.from({ length: 7 }, (_, index): Curl => {
        const angle = (index / 7) * 2 * Math.PI - Math.PI / 2;
        return [cx + Math.cos(angle) * r * 0.62, cy + Math.sin(angle) * r * 0.62, r * 0.48];
    });
    return [...ring, [cx, cy, r * 0.68]];
}

/**
 * Her tail: a round, fluffy bun gathered behind the crown, drawn behind the
 * head so it stands out against the background. It sits on the left so it
 * never crowds the props, which appear on her right.
 */
const BUN_CURLS = pompom(66.5, 44, 11.5);

type EyeStyle = 'open' | 'happy';
/**
 * Brows carry most of her expression: `soft` is the calm, attentive default,
 * `curious` lifts one brow for tips, `ponder` tilts them against each other
 * while she thinks, and `joy` lifts both.
 */
type BrowStyle = 'soft' | 'curious' | 'ponder' | 'joy';
type MouthStyle = 'smile' | 'open' | 'hmm';
type ArmPose = 'rest' | 'wave' | 'point' | 'chin' | 'up';
type Prop = 'bulb' | 'confetti' | 'dots' | 'waveLines';

interface PoseSpec {
    eyes: EyeStyle;
    gaze: readonly [dx: number, dy: number];
    mouth: MouthStyle;
    brows: BrowStyle;
    headTilt: number;
    leftArm: ArmPose;
    rightArm: ArmPose;
    prop?: Prop;
    staffBeanie?: boolean;
}

const POSES: Record<MascotPose, PoseSpec> = {
    happy: {
        eyes: 'open',
        gaze: [0, 0],
        mouth: 'smile',
        brows: 'soft',
        headTilt: 0,
        leftArm: 'rest',
        rightArm: 'rest',
    },
    wave: {
        eyes: 'open',
        gaze: [0, 0],
        mouth: 'open',
        brows: 'soft',
        headTilt: -4,
        leftArm: 'rest',
        rightArm: 'wave',
        prop: 'waveLines',
    },
    point: {
        eyes: 'open',
        gaze: [2.5, 0],
        mouth: 'open',
        brows: 'soft',
        headTilt: 0,
        leftArm: 'rest',
        rightArm: 'point',
    },
    staff: {
        eyes: 'open',
        gaze: [0, 0],
        mouth: 'smile',
        brows: 'soft',
        headTilt: -2,
        leftArm: 'rest',
        rightArm: 'rest',
        staffBeanie: true,
    },
    idea: {
        eyes: 'open',
        gaze: [1.5, -1.5],
        mouth: 'smile',
        brows: 'curious',
        headTilt: -6,
        leftArm: 'rest',
        rightArm: 'rest',
        prop: 'bulb',
    },
    think: {
        eyes: 'open',
        gaze: [2, -2.5],
        mouth: 'hmm',
        brows: 'ponder',
        headTilt: 5,
        leftArm: 'rest',
        rightArm: 'chin',
        prop: 'dots',
    },
    celebrate: {
        eyes: 'happy',
        gaze: [0, 0],
        mouth: 'open',
        brows: 'joy',
        headTilt: 0,
        leftArm: 'up',
        rightArm: 'up',
        prop: 'confetti',
    },
};

/** Shoulder pivot of the right arm; the left arm is its mirror image. */
const SHOULDER = { x: 126, y: 141 } as const;

/**
 * At rest both hooves come together in front of her tummy, a composed,
 * attentive stance instead of arms hanging at her sides.
 */
const ARM_GEOMETRY: Record<ArmPose, { angle: number; length: number }> = {
    rest: { angle: 124, length: 35 },
    wave: { angle: -50, length: 34 },
    point: { angle: -8, length: 37 },
    chin: { angle: -135, length: 29 },
    up: { angle: -58, length: 34 },
};

const motion = (animated: boolean, className: string) => (animated ? className : undefined);

/**
 * To read as a trustworthy executive her body is a felt blazer, open at the
 * collar over a white shirt, buttoned once, with a brand pin on the lapel and
 * stitched edges. The lavender rim matches her wool's, so her outline stays
 * continuous and the jacket keeps its shape on dark surfaces.
 */
function Blazer() {
    const paint = usePaint();
    return (
        <g data-accessory="blazer">
            <path
                d="M 87.5 121 C 75 123 66 131 63.5 145 C 61 158 61.5 169.5 67.5 176.5 C 75 184 125 184 132.5 176.5 C 138.5 169.5 139 158 136.5 145 C 134 131 125 123 112.5 121 Z"
                fill={paint('blazer')}
                stroke={COLORS.woolEdge}
                strokeWidth={2.6}
                strokeLinejoin="round"
            />
            <path d="M 84 124 L 100 159 L 116 124 Z" fill={paint('shirt')} />
            <g fill={COLORS.wool} stroke={COLORS.woolEdge} strokeWidth={1} strokeLinejoin="round">
                <path d="M 83.5 124 L 94 128 L 95.5 140 Z" />
                <path d="M 116.5 124 L 106 128 L 104.5 140 Z" />
            </g>
            <g fill={COLORS.jacketShade}>
                <path d="M 79.5 126.5 L 100 163 L 93 146 L 86.5 135 Z" />
                <path d="M 120.5 126.5 L 100 163 L 107 146 L 113.5 135 Z" />
            </g>
            <g stroke={COLORS.stitch} {...STITCH}>
                <path d="M 82.5 130 L 97.5 158.5" />
                <path d="M 117.5 130 L 102.5 158.5" />
                <path d="M 70 173.5 C 81 179 119 179 130 173.5" />
            </g>
            <circle cx={100} cy={166} r={3.3} fill={COLORS.woolEdge} />
            <g fill={COLORS.jacketShade}>
                <circle cx={99} cy={166} r={0.75} />
                <circle cx={101} cy={166} r={0.75} />
            </g>
            <circle cx={116.5} cy={143} r={3.2} fill={COLORS.brand} stroke={COLORS.wool} strokeWidth={1.2} />
            <circle cx={115.6} cy={142.1} r={0.9} fill={COLORS.wool} fillOpacity={0.7} />
        </g>
    );
}

/** Stubby legs with darker felt hoof pads, sewn on under the blazer's hem. */
function Legs() {
    const paint = usePaint();
    return (
        <g>
            {[81, 102].map((x) => (
                <g key={x}>
                    <rect x={x} y={168} width={17} height={22} rx={8.5} fill={paint('felt')} />
                    <rect x={x} y={181.5} width={17} height={8.5} rx={4.25} fill={paint('hoof')} />
                    <path d={`M ${x + 2.5} 182.5 H ${x + 14.5}`} stroke={COLORS.hoof} {...STITCH} />
                </g>
            ))}
        </g>
    );
}

/**
 * A cluster of curls with one continuous lavender rim: the rim discs are all
 * drawn first, a little larger, so the outline only shows around the outside.
 */
function Curls({ curls }: { curls: readonly Curl[] }) {
    const paint = usePaint();
    return (
        <>
            <g fill={COLORS.woolEdge}>
                {curls.map(([cx, cy, r]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r + 1.6} />
                ))}
            </g>
            <g fill={paint('wool')}>
                {curls.map(([cx, cy, r]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
                ))}
            </g>
        </>
    );
}

function Hair() {
    return (
        <g data-accessory="hair">
            <Curls curls={WOOL_CURLS} />
        </g>
    );
}

function HairBun() {
    return (
        <g data-accessory="hair-bun">
            <Curls curls={BUN_CURLS} />
        </g>
    );
}

/**
 * Arms are drawn once for the right side and mirrored for the left so both
 * hooves share exactly the same shape: a stubby felt sleeve with a stitched
 * cuff and a soft hoof, rotated around the shoulder.
 */
function Arm({ side, pose, animated }: { side: 'left' | 'right'; pose: ArmPose; animated: boolean }) {
    const paint = usePaint();
    const { angle, length } = ARM_GEOMETRY[pose];
    const mirror = side === 'left' ? MIRROR : undefined;
    const waving = pose === 'wave' && animated;
    const { x, y } = SHOULDER;
    const tip = x - 4 + length;
    return (
        <g transform={mirror}>
            <g transform={`rotate(${angle} ${x} ${y})`}>
                <g className={waving ? 'binah-mascot-wave' : undefined}>
                    <ellipse cx={tip - 6.5} cy={y} rx={7.2} ry={6.8} fill={paint('hoof')} />
                    <path
                        d={`M ${tip - 1.5} ${y - 2.4} Q ${tip - 3} ${y} ${tip - 1.5} ${y + 2.4}`}
                        stroke={COLORS.hoof}
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        fill="none"
                    />
                    <rect
                        x={x - 4}
                        y={y - 8}
                        width={length - 9}
                        height={16}
                        rx={8}
                        fill={paint('sleeve')}
                        stroke={COLORS.woolEdge}
                        strokeOpacity={0.6}
                        strokeWidth={1.2}
                    />
                    <path d={`M ${tip - 15.5} ${y - 6.5} V ${y + 6.5}`} stroke={COLORS.stitch} {...STITCH} />
                </g>
            </g>
        </g>
    );
}

const EYE_CENTERS = [84, 116] as const;
const EYE_Y = 98;
/** Open eyes are upright pills, half as wide as they are tall. */
const EYE_PILL = { width: 6.8, height: 12.4 } as const;

/**
 * Open eyes are plain upright pills in matte dark felt, with no pupils or
 * catchlights: the minimal, friendly look of today's AI mascots. Expression
 * comes from the brows, the mouth and where the pills sit. Neutral-gaze poses
 * glance around now and then.
 */
function Eyes({
    style,
    gaze,
    wander,
    animated,
}: {
    style: EyeStyle;
    gaze: PoseSpec['gaze'];
    wander: boolean;
    animated: boolean;
}) {
    if (style === 'happy') {
        return (
            <g fill="none" stroke={COLORS.eye} strokeWidth={3.2} strokeLinecap="round">
                {EYE_CENTERS.map((cx) => (
                    <path key={cx} d={`M ${cx - 5.5} ${EYE_Y + 1.5} Q ${cx} ${EYE_Y - 5} ${cx + 5.5} ${EYE_Y + 1.5}`} />
                ))}
            </g>
        );
    }
    const [dx, dy] = gaze;
    const { width, height } = EYE_PILL;
    return (
        <g className={motion(animated, 'binah-mascot-eyes')}>
            <g className={wander ? motion(animated, 'binah-mascot-gaze') : undefined} fill={COLORS.eye}>
                {EYE_CENTERS.map((cx) => (
                    <rect
                        key={cx}
                        x={cx + dx - width / 2}
                        y={EYE_Y + dy - height / 2}
                        width={width}
                        height={height}
                        rx={width / 2}
                    />
                ))}
            </g>
        </g>
    );
}

const LENS_R = 11.5;

/**
 * Round black glasses, like a soft toy's moulded frames: a light edge along
 * the top of each rim, a faint lens tint with a highlight, and short temples
 * that disappear into her wool.
 */
function Glasses() {
    return (
        <g data-accessory="glasses" fill="none" stroke={COLORS.frame} strokeWidth={3.2} strokeLinecap="round">
            {EYE_CENTERS.map((cx) => (
                <circle key={cx} cx={cx} cy={EYE_Y} r={LENS_R} fill={COLORS.wool} fillOpacity={0.12} />
            ))}
            <path d={`M ${EYE_CENTERS[0] + LENS_R} 96 Q 100 92.6 ${EYE_CENTERS[1] - LENS_R} 96`} />
            <path d={`M ${EYE_CENTERS[0] - LENS_R} 96.5 L 65 94.5`} />
            <path d={`M ${EYE_CENTERS[1] + LENS_R} 96.5 L 135 94.5`} />
            <g stroke={COLORS.frameLight} strokeWidth={1.1} strokeOpacity={0.9}>
                {EYE_CENTERS.map((cx) => (
                    <path
                        key={cx}
                        d={`M ${cx - 7.5} ${EYE_Y - 8.7} A ${LENS_R} ${LENS_R} 0 0 1 ${cx + 7.5} ${EYE_Y - 8.7}`}
                    />
                ))}
            </g>
            <g stroke={COLORS.wool} strokeWidth={1.8} strokeOpacity={0.8}>
                {EYE_CENTERS.map((cx) => (
                    <path
                        key={cx}
                        d={`M ${cx - 8} ${EYE_Y - 1.5} Q ${cx - 7.4} ${EYE_Y - 6} ${cx - 4} ${EYE_Y - 7.8}`}
                    />
                ))}
            </g>
        </g>
    );
}

/** Embroidered brows, just above the frames. */
const BROWS: Record<BrowStyle, readonly [left: string, right: string]> = {
    soft: ['M 76 82 Q 82 78.3 88.5 80', 'M 111.5 80 Q 118 78.3 124 82'],
    curious: ['M 75.5 79.6 Q 81.5 74.8 88 77', 'M 111.5 80 Q 118 78.3 124 82'],
    ponder: ['M 76 79.8 Q 82 75.4 88.5 77.8', 'M 111.5 81.4 Q 118 80 124 81'],
    joy: ['M 76 79.2 Q 82 74.8 88.5 77.2', 'M 111.5 77.2 Q 118 74.8 124 79.2'],
};

function Brows({ style }: { style: BrowStyle }) {
    return (
        <g fill="none" stroke={COLORS.brow} strokeWidth={2.6} strokeLinecap="round">
            {BROWS[style].map((d) => (
                <path key={d} d={d} />
            ))}
        </g>
    );
}

/** Felt nose with the embroidered thread that runs down to her mouth. */
function Nose() {
    const paint = usePaint();
    return (
        <g>
            <path d="M 100 112.6 V 118.6" fill="none" stroke={COLORS.mouth} strokeWidth={1.8} strokeLinecap="round" />
            <path
                d="M 95 109.6 Q 100 107.4 105 109.6 Q 105.4 111.6 100 114.2 Q 94.6 111.6 95 109.6 Z"
                fill={paint('nose')}
            />
            <ellipse cx={98.4} cy={109.5} rx={1.5} ry={0.8} fill={COLORS.wool} fillOpacity={0.6} />
        </g>
    );
}

function Mouth({ style }: { style: MouthStyle }) {
    switch (style) {
        case 'open':
            return (
                <g>
                    <path
                        d="M 93 116 Q 100 117.6 107 116 Q 106.4 124.6 100 124.8 Q 93.6 124.6 93 116 Z"
                        fill={COLORS.mouth}
                    />
                    <ellipse cx={100} cy={122.4} rx={3.8} ry={2} fill={COLORS.tongue} />
                </g>
            );
        case 'hmm':
            return (
                <path
                    d="M 95 118.8 Q 100 120.2 105 117.4"
                    fill="none"
                    stroke={COLORS.mouth}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                />
            );
        default:
            return (
                <path
                    d="M 93.5 116.2 Q 100 122.6 106.5 116.2"
                    fill="none"
                    stroke={COLORS.mouth}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            );
    }
}

const BEANIE_POMPOM = pompom(100, 37.5, 7.5);
/** Vertical ribs along the beanie's turned-up cuff. */
const BEANIE_RIBS = Array.from({ length: 16 }, (_, index) => 62.5 + index * 5);

/**
 * Brand-coloured knit beanie used when the guide represents platform access:
 * a soft dome with a ribbed cuff and a wool pompom, her side wool puffing out
 * below it.
 */
function StaffBeanie({ pompom }: { pompom: boolean }) {
    const paint = usePaint();
    return (
        <g data-accessory="staff-beanie">
            <path
                d="M 59 66 C 58 46 76 37 100 37 C 124 37 142 46 141 66 Z"
                fill={paint('cap')}
                stroke={COLORS.brandShade}
                strokeWidth={1.2}
                strokeLinejoin="round"
            />
            <g fill="none" stroke={COLORS.brandShade} strokeOpacity={0.35} strokeWidth={1.2} strokeLinecap="round">
                <path d="M 80 62 C 79.5 52 84 44 90.5 40" />
                <path d="M 100 62 V 39" />
                <path d="M 120 62 C 120.5 52 116 44 109.5 40" />
            </g>
            <path
                d="M 58 59.5 Q 100 52 142 59.5 Q 146 60.5 145.5 64.5 Q 145 69 141 69.5 Q 100 63 59 69.5 Q 55 69 54.5 64.5 Q 54 60.5 58 59.5 Z"
                fill={paint('cap')}
                stroke={COLORS.brandShade}
                strokeWidth={1.2}
                strokeLinejoin="round"
            />
            <g stroke={COLORS.brandShade} strokeOpacity={0.4} strokeWidth={1.3} strokeLinecap="round">
                {BEANIE_RIBS.map((x) => {
                    const top = 55.75 + 3.75 * ((x - 100) / 42) ** 2;
                    const bottom = 66.25 + 3.25 * ((x - 100) / 41) ** 2;
                    return <path key={x} d={`M ${x} ${top + 2} V ${bottom - 2}`} />;
                })}
            </g>
            {pompom && (
                <g data-accessory="beanie-pompom">
                    <Curls curls={BEANIE_POMPOM} />
                </g>
            )}
        </g>
    );
}

const CONFETTI: readonly {
    shape: 'dot' | 'square';
    x: number;
    y: number;
    fill: string;
    delay: string;
    duration: string;
}[] = [
    { shape: 'dot', x: 34, y: 62, fill: COLORS.brand, delay: '-0.2s', duration: '1.7s' },
    { shape: 'square', x: 165, y: 47, fill: COLORS.spark, delay: '-0.9s', duration: '2.1s' },
    { shape: 'dot', x: 50, y: 32, fill: COLORS.cheek, delay: '-1.3s', duration: '1.9s' },
    { shape: 'dot', x: 152, y: 22, fill: COLORS.brand, delay: '-0.5s', duration: '2.3s' },
    { shape: 'square', x: 25, y: 99, fill: COLORS.spark, delay: '-1.6s', duration: '1.8s' },
    { shape: 'dot', x: 176, y: 94, fill: COLORS.cheek, delay: '-0.7s', duration: '2s' },
];

/**
 * Props sit around a full-body composition by default. The avatar crop is a
 * head-and-shoulders portrait, so props are pulled in beside her head and
 * drawn in front so they stay inside the circular frame and read clearly at
 * toast sizes.
 */
const AVATAR_PROP_TRANSFORM: Record<Prop, string> = {
    bulb: 'translate(141 72) scale(0.8) translate(-156 -42)',
    dots: 'translate(134 80) scale(0.5) translate(-150 -52)',
    confetti: 'translate(100 92) scale(0.66) translate(-100 -92)',
    waveLines: 'translate(143 110) scale(0.65) translate(-165 -115)',
};

/**
 * Full-body composition: props sit close to her head and, after
 * `FIGURE_SCALE`, inside the 200x200 box (pop and burst overshoots included),
 * so an ancestor with hidden overflow never cuts them.
 */
const FIGURE_PROP_TRANSFORM: Partial<Record<Prop, string>> = {
    bulb: 'translate(153 52) scale(1.05) translate(-156 -42)',
    dots: 'translate(-2 0)',
    confetti: 'translate(100 110) scale(0.85) translate(-100 -110)',
    waveLines: 'translate(4 0)',
};

/** Size multiplier for confetti pieces, thought dots and wave strokes. */
const PROP_EMPHASIS: Record<MascotVariant, number> = { figure: 1.5, avatar: 2 };

function PropLayer({ prop, animated, layout }: { prop: Prop | undefined; animated: boolean; layout: MascotVariant }) {
    if (!prop) return null;
    const content = <PropShape prop={prop} animated={animated} emphasis={PROP_EMPHASIS[layout]} />;
    const transform = layout === 'avatar' ? AVATAR_PROP_TRANSFORM[prop] : FIGURE_PROP_TRANSFORM[prop];
    return transform ? <g transform={transform}>{content}</g> : content;
}

function PropShape({ prop, animated, emphasis }: { prop: Prop; animated: boolean; emphasis: number }) {
    const paint = usePaint();
    switch (prop) {
        case 'bulb':
            return (
                <g className={motion(animated, 'binah-mascot-pop')}>
                    <circle
                        cx={156}
                        cy={42}
                        r={17}
                        fill={COLORS.spark}
                        fillOpacity={0.22}
                        className={motion(animated, 'binah-mascot-glow')}
                    />
                    <g stroke={COLORS.spark} strokeWidth={2.5} strokeLinecap="round">
                        <path d="M 156 24 V 17" className={motion(animated, 'binah-mascot-ray')} />
                        <path
                            d="M 170 30 L 175 25"
                            className={motion(animated, 'binah-mascot-ray')}
                            style={{ animationDelay: '0.25s' }}
                        />
                        <path
                            d="M 142 30 L 137 25"
                            className={motion(animated, 'binah-mascot-ray')}
                            style={{ animationDelay: '0.5s' }}
                        />
                    </g>
                    <g className={motion(animated, 'binah-mascot-spark')}>
                        <circle cx={156} cy={42} r={10.5} fill={paint('spark')} />
                        <circle cx={152} cy={38} r={2.6} fill={COLORS.wool} fillOpacity={0.8} />
                        <rect x={150.5} y={52} width={11} height={4} rx={1.5} fill={COLORS.nose} />
                        <rect x={152.5} y={57.5} width={7} height={3} rx={1.5} fill={COLORS.nose} />
                    </g>
                </g>
            );
        case 'dots':
            return (
                <g fill={COLORS.brand} fillOpacity={0.4}>
                    <circle cx={143} cy={64} r={2.5 * emphasis} className={motion(animated, 'binah-mascot-dot')} />
                    <circle
                        cx={152}
                        cy={52}
                        r={3.5 * emphasis}
                        className={motion(animated, 'binah-mascot-dot')}
                        style={{ animationDelay: '0.3s' }}
                    />
                    <circle
                        cx={164}
                        cy={37}
                        r={5 * emphasis}
                        className={motion(animated, 'binah-mascot-dot')}
                        style={{ animationDelay: '0.6s' }}
                    />
                </g>
            );
        case 'waveLines':
            return (
                <g
                    fill="none"
                    stroke={COLORS.brand}
                    strokeWidth={2.5 * emphasis}
                    strokeLinecap="round"
                    strokeOpacity={0.75}
                >
                    <path d="M 157 120 q 8 -7 6 -17" className={motion(animated, 'binah-mascot-ripple')} />
                    <path
                        d="M 166 129 q 12 -11 9 -27"
                        className={motion(animated, 'binah-mascot-ripple')}
                        style={{ animationDelay: '0.2s' }}
                    />
                </g>
            );
        case 'confetti':
            return (
                <g className={motion(animated, 'binah-mascot-burst')}>
                    {CONFETTI.map((piece, index) => (
                        <g
                            key={index}
                            className={motion(animated, 'binah-mascot-confetti')}
                            style={{ animationDelay: piece.delay, animationDuration: piece.duration }}
                        >
                            <g
                                transform={`translate(${piece.x} ${piece.y}) scale(${emphasis}) translate(${-piece.x} ${-piece.y})`}
                            >
                                {piece.shape === 'dot' ? (
                                    <circle cx={piece.x} cy={piece.y} r={index % 2 === 0 ? 3 : 2.6} fill={piece.fill} />
                                ) : (
                                    <rect
                                        x={piece.x - 3}
                                        y={piece.y - 3}
                                        width={6}
                                        height={6}
                                        rx={1}
                                        fill={piece.fill}
                                        transform={`rotate(${index % 2 === 0 ? -25 : 20} ${piece.x} ${piece.y})`}
                                    />
                                )}
                            </g>
                        </g>
                    ))}
                </g>
            );
        default:
            return null;
    }
}

/**
 * `figure` is the full-body drawing. `avatar` crops to head and shoulders
 * inside a circle, the way a profile photo would, for toasts, chat rows, and
 * other compact identity slots.
 */
export type MascotVariant = 'figure' | 'avatar';

const AVATAR_VIEWBOX = '42 38 116 116';
const AVATAR_CLIP = { cx: 100, cy: 96, r: 58 } as const;
/** The full figure is scaled up from her feet so her head and props fill the 200x200 frame. */
const FIGURE_SCALE = 'translate(100 192) scale(1.12) translate(-100 -192)';

export interface MascotProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    /** Full-body figure (default) or a head-and-shoulders circular avatar crop. */
    variant?: MascotVariant;
    /** Expression and gesture. Defaults to the neutral friendly pose. */
    pose?: MascotPose;
    /** Rendered width and height in pixels. */
    size?: number;
    /**
     * Motion: a short entrance, then breathing, a trailing head sway, blinks
     * and glances, plus the pose's own gesture (waving, glowing bulb,
     * floating confetti). Respects reduced-motion.
     */
    animated?: boolean;
    /** Mirror horizontally so pointing/waving faces the other way. */
    flip?: boolean;
    /** Accessible name. Ignored when `decorative` is set. */
    label?: string;
    /** Hide from assistive tech when nearby text already conveys the meaning. */
    decorative?: boolean;
}

/**
 * Each instance starts its idle loops at a different point (derived from its
 * React id, so it is stable across renders) so several mascots on one screen
 * never breathe or blink in lockstep.
 */
function idlePhase(seed: string): string {
    let hash = 0;
    for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) | 0;
    return `${-(1 + (Math.abs(hash) % 600) / 100)}s`;
}

export function Mascot({
    pose = 'happy',
    variant = 'figure',
    size = 96,
    animated = true,
    flip = false,
    label = MASCOT_DEFAULT_LABEL,
    decorative = false,
    className,
    style,
    ...svgProps
}: MascotProps) {
    const spec = POSES[pose];
    const instanceId = useId();
    const avatarClipId = useId();
    const isAvatar = variant === 'avatar';
    const wander = spec.eyes === 'open' && spec.gaze[0] === 0 && spec.gaze[1] === 0;
    const paint = (name: PaintName) => `url(#${instanceId}-${name})`;

    return (
        <svg
            viewBox={isAvatar ? AVATAR_VIEWBOX : '0 0 200 200'}
            width={size}
            height={size}
            className={cn('binah-mascot shrink-0 overflow-visible', className)}
            data-pose={pose}
            data-variant={variant}
            role={decorative ? undefined : 'img'}
            aria-label={decorative ? undefined : label}
            aria-hidden={decorative ? true : undefined}
            focusable="false"
            style={animated ? ({ ...style, '--binah-mascot-phase': idlePhase(instanceId) } as CSSProperties) : style}
            {...svgProps}
        >
            <defs>
                <PaintDefs id={instanceId} />
                {isAvatar && (
                    <clipPath id={avatarClipId}>
                        <circle cx={AVATAR_CLIP.cx} cy={AVATAR_CLIP.cy} r={AVATAR_CLIP.r} />
                    </clipPath>
                )}
            </defs>
            <PaintContext value={paint}>
                <g clipPath={isAvatar ? `url(#${avatarClipId})` : undefined}>
                    <g className={motion(animated, 'binah-mascot-enter')}>
                        <g transform={isAvatar ? undefined : FIGURE_SCALE}>
                            {/* A soft contact shadow grounds the toy on whatever surface she sits on. */}
                            {!isAvatar && <ellipse cx={100} cy={190.5} rx={30} ry={4} fill={paint('contact')} />}
                            <g transform={flip ? MIRROR : undefined}>
                                <g className={animated ? 'binah-mascot-figure' : undefined}>
                                    {!isAvatar && <PropLayer prop={spec.prop} animated={animated} layout="figure" />}

                                    {/* Legs come out under the blazer's hem. */}
                                    <Legs />
                                    <Blazer />
                                    {/* The wool under her chin casts a soft shadow on her shirt and lapels. */}
                                    <ellipse cx={100} cy={142} rx={30} ry={7} fill={paint('contact')} />

                                    {/* The head trails the body's breathing and sways on its own cycle. */}
                                    <g className={motion(animated, 'binah-mascot-head')}>
                                        <g className={motion(animated, 'binah-mascot-sway')}>
                                            <g
                                                transform={
                                                    spec.headTilt ? `rotate(${spec.headTilt} 100 122)` : undefined
                                                }
                                            >
                                                {/* The portrait crop would cut the tail off at the frame's edge. */}
                                                {!spec.staffBeanie && !isAvatar && <HairBun />}
                                                <ellipse cx={100} cy={95.5} rx={38.5} ry={38} fill={paint('head')} />
                                                <ellipse cx={100} cy={116} rx={16} ry={12} fill={paint('muzzle')} />
                                                <g fill={paint('cheek')}>
                                                    <ellipse cx={75.5} cy={113} rx={8} ry={5.5} />
                                                    <ellipse cx={124.5} cy={113} rx={8} ry={5.5} />
                                                </g>
                                                <Hair />

                                                <Brows style={spec.brows} />
                                                {/* The portrait crop would cut the pompom off at the frame's edge. */}
                                                {spec.staffBeanie && <StaffBeanie pompom={!isAvatar} />}
                                                <Eyes
                                                    style={spec.eyes}
                                                    gaze={spec.gaze}
                                                    wander={wander}
                                                    animated={animated}
                                                />
                                                <Glasses />
                                                <Nose />
                                                <Mouth style={spec.mouth} />
                                            </g>
                                        </g>
                                    </g>

                                    <Arm side="left" pose={spec.leftArm} animated={animated} />
                                    <Arm side="right" pose={spec.rightArm} animated={animated} />
                                    {isAvatar && <PropLayer prop={spec.prop} animated={animated} layout="avatar" />}
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </PaintContext>
        </svg>
    );
}
